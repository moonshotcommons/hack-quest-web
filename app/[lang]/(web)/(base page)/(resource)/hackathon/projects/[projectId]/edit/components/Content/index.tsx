import React, { Fragment, useEffect, useRef } from 'react';
import { ProjectType, SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';

import { OffsetTopsType } from '../../../../../constants/type';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import { useRedirect } from '@/hooks/router/useRedirect';
import Nav from '../Nav';
import { getHackathonSubmissionSteps } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';
import {
  HackathonRendererProvider,
  useValidatorFormSchema
} from '@/components/HackathonCreation/Renderer/HackathonRendererProvider';
import Title from '@/components/Common/Title';
import { CustomComponentConfig, SubmissionSectionType } from '@/components/HackathonCreation/type';
import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEqual, omit } from 'lodash-es';
import { Form } from '@/components/ui/form';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';

function getDefaultValues(project: ProjectType) {
  const {
    name,
    prizeTrack,
    tracks,
    location,
    wallet,
    logo,
    fields = {},
    pitchVideo,
    demoVideo,
    detail = {},
    addition = {}
  } = project!;

  const defaultBasicInfo = {
    logo: logo || '',
    name: name || '',
    location: location || '',
    prizeTrack: prizeTrack || '',
    tracks: tracks.join(','),
    wallet: wallet || '',
    pitchVideo: pitchVideo ?? undefined,
    demoVideo: demoVideo ?? undefined,
    fields
  };

  const defaultProjectDetail = omit(detail, 'id');

  const defaultAdditions = omit(addition, 'id');

  const defaultValues: Record<string, any> = {
    ...omit(defaultBasicInfo, 'fields'),
    ...omit(defaultProjectDetail, 'fields'),
    ...omit(defaultAdditions, 'fields')
  };

  for (let key in fields) {
    defaultValues[key] = fields[key].value;
  }

  for (let key in detail.fields || {}) {
    defaultValues[key] = detail.fields?.[key].value;
  }

  for (let key in addition.fields || {}) {
    defaultValues[key] = addition.fields?.[key].value;
  }

  for (let key in defaultValues) {
    defaultValues[key] = defaultValues[key] ?? '';
  }

  return { defaultValues, defaultBasicInfo, defaultProjectDetail, defaultAdditions };
}

const copyValues = (oldValues: Record<string, any>, values: Record<string, any>): Record<string, any> => {
  const newValues: Record<string, any> = structuredClone(oldValues);
  for (let key in newValues) {
    if (key === 'fields') {
      for (let id in newValues[key]) {
        newValues[key][id].value = values[id];
      }
      continue;
    }

    if (key === 'tracks') {
      newValues[key] = values[key].split(',');
      continue;
    }

    newValues[key] = values[key];
  }
  return newValues;
};

interface ContentProp {
  setOffsetTop: (tops: OffsetTopsType[]) => void;
  project: ProjectType;
  hackathon: SimpleHackathonInfo;
  handleClickAnchor: (index: number) => void;
  curAnchorIndex: number;
  offsetTops: OffsetTopsType[];
  isClose: boolean;
}

const Content: React.FC<ContentProp> = ({
  setOffsetTop,
  project,
  hackathon,
  curAnchorIndex,
  offsetTops,
  handleClickAnchor,
  isClose
}) => {
  const boxRef = useRef<HTMLFormElement>(null);
  const fullSectionConfig = hackathon.info.submission;
  const sectionData = getHackathonSubmissionSteps(fullSectionConfig, ['Review']);

  const { defaultValues, defaultBasicInfo, defaultProjectDetail, defaultAdditions } = getDefaultValues(project);

  const formSchema = useValidatorFormSchema(fullSectionConfig, true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const formState = useFormState({
    control: form.control
  });

  const getOffsetTops = () => {
    const offsetTops = [];
    const childNodes = boxRef.current?.childNodes || [];
    const navData = sectionData.map((s) => s.title as string);
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0;
      offsetTops.push({
        title: `${navData[i]}`,
        offsetTop: offsetTop
      });
    }
    setOffsetTop(offsetTops);
  };

  const { redirectToUrl } = useRedirect();

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  useEffect(() => {
    getOffsetTops();
  }, [project]);

  const { runAsync: onSubmitRequest, loading } = useRequest(
    async (values: Record<string, any>) => {
      const basicInfo: Record<string, any> = copyValues(defaultBasicInfo, values);
      const projectDetail: Record<string, any> = copyValues(defaultProjectDetail, values);
      const additions: Record<string, any> = copyValues(defaultAdditions, values);

      const res = await webApi.resourceStationApi.submitProject({ basicInfo, projectDetail, additions }, project.id);
      return {
        res,
        newInfo: {
          ...values
        }
      };
    },
    {
      manual: true,
      debounceWait: 300,
      onSuccess() {
        redirectToUrl(`/hackathon/projects/${project.id}`);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const onSubmit = (values: any) => {
    if (isEqual(defaultValues, values)) {
      redirectToUrl(`/hackathon/projects/${project.id}`);
    } else {
      onSubmitRequest(values);
    }
  };

  const onExit = () => {
    if (isEqual({}, form.getValues()) || isClose) {
      redirectToUrl(`/hackathon/projects/${project.id}`);
    } else {
      exitConfirmRef.current?.open({
        onConfirm: () => onSubmitRequest(form.getValues())
      });
    }
  };

  const sortSectionKeys = (Object.keys(fullSectionConfig) as SubmissionSectionType[]).sort((a, b) => {
    return sectionData.findIndex((step) => step.type === a) - sectionData.findIndex((step) => step.type === b);
  });

  return (
    <HackathonRendererProvider
      simpleHackathonInfo={hackathon}
      hackathonSteps={sectionData}
      onNext={() => {}}
      onBack={() => {}}
      prizeTracks={hackathon.rewards.map((item) => item.name)}
      handleType="edit"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <div className="relative">
            <Nav
              sectionData={sectionData.map((s) => s.title as string)}
              curAnchorIndex={curAnchorIndex}
              offsetTops={offsetTops}
              handleClickAnchor={handleClickAnchor}
              onSava={() => {
                // onSubmit(form.getValues());
              }}
              onExit={onExit}
              submitDisable={isClose || !formState.isValid || isEqual(defaultValues, form.getValues())}
            />
          </div>
          <div className="flex flex-1 flex-shrink-0 flex-col gap-[60px] pb-[84px] text-neutral-off-black">
            {sortSectionKeys.map((sectionKey) => {
              const sectionConfig = fullSectionConfig[sectionKey];
              return (
                <div key={sectionKey} className="flex flex-col gap-8">
                  <Title>
                    <span className="text-h3">{sectionData.find((item) => item.type === sectionKey)?.title}</span>
                  </Title>
                  <div className="flex flex-col gap-8 text-neutral-rich-gray">
                    {sectionConfig.map((config, index) => {
                      return (
                        <Fragment key={index}>{renderFormComponent(config as CustomComponentConfig, form)}</Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </Form>
      <ConfirmModal ref={exitConfirmRef} confirmText={'Save & leave'}>
        <h4 className="text-h4 text-center text-neutral-black">Do you want to save the submission process & leave?</h4>
      </ConfirmModal>
    </HackathonRendererProvider>
  );
};

export default Content;
