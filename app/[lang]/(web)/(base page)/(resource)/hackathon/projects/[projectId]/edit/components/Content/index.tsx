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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEqual } from 'lodash-es';
import { Form } from '@/components/ui/form';

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

  const formSchema = useValidatorFormSchema(fullSectionConfig, true);

  const form = useForm({
    resolver: zodResolver(formSchema)
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

  // const { runAsync: onSubmitRequest, loading } = useRequest(
  //   async () => {
  //     const values = form.getValues();
  //     if (
  //       form.getValues('isPublic') === true &&
  //       !/^https?:\/\/(www\.)?github\.com\/[^/]+\/.*$/.test((form.getValues('githubLink') || '').trim())
  //     ) {
  //       form.setError('githubLink', {
  //         message: 'Invalid GitHub URL'
  //       });
  //       return;
  //     }

  //     const formData = new FormData();
  //     const {
  //       projectName,
  //       track,
  //       detailedIntro,
  //       intro,
  //       prizeTrack,
  //       location,
  //       isPublic,
  //       githubLink,
  //       tagline,
  //       solvedProblem,
  //       challenges,
  //       technologies,
  //       teamID,
  //       roomNumber,
  //       contractLink,
  //       projectLink,
  //       socialLink,
  //       partnerTooling,
  //       figma,
  //       playstore,
  //       demo,
  //       googleDrive,
  //       other
  //     } = values;
  //     formData.append('name', projectName);
  //     formData.append('prizeTrack', prizeTrack);

  //     track.split(',').forEach((t) => {
  //       formData.append('tracks[]', t);
  //     });

  //     hackathon.id !== HackathonPartner.Hack4Bengal && formData.append('location', location);

  //     formData.append('description', detailedIntro);
  //     formData.append('introduction', intro);
  //     formData.append('isOpenSource', String(isPublic));
  //     formData.append('githubLink', githubLink || '');
  //     formData.append('tagline', tagline || '');
  //     formData.append('solvedProblem', solvedProblem || '');
  //     formData.append('challenges', challenges || '');
  //     formData.append('technologies', technologies || '');
  //     formData.append('teamID', teamID || '');
  //     formData.append('roomNumber', roomNumber || '');
  //     formData.append('demo', demo || '');

  //     const links = {
  //       contractLink: contractLink || '',
  //       projectLink: projectLink || '',
  //       socialLink: socialLink || '',
  //       partnerTooling: partnerTooling || '',
  //       figma: figma || '',
  //       playstore: playstore || '',
  //       googleDrive: googleDrive || '',
  //       other: other || ''
  //     };

  //     formData.append('links', JSON.stringify(links));

  //     logo && formData.append('thumbnail', logo?.originFileObj as RcFile);
  //     const res = await webApi.resourceStationApi.submitProject(formData, project.id);
  //     return {
  //       res,
  //       newInfo: {
  //         ...values
  //       }
  //     };
  //   },
  //   {
  //     manual: true,
  //     onSuccess() {
  //       redirectToUrl(`/hackathon/projects/${project.id}`);
  //     },
  //     onError(err) {
  //       errorMessage(err);
  //     }
  //   }
  // );

  const onSubmit = () => {
    if (isEqual({}, form.getValues())) {
      redirectToUrl(`/hackathon/projects/${project.id}`);
    } else {
      // onSubmitRequest();
    }
  };

  const onExit = () => {
    if (isEqual({}, form.getValues()) || isClose) {
      redirectToUrl(`/hackathon/projects/${project.id}`);
    } else {
      // exitConfirmRef.current?.open({
      //   onConfirm: onSubmitRequest
      // });
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
              onSava={onSubmit}
              onExit={onExit}
              submitDisable={isClose}
            />
          </div>
          <div className="flex flex-1 flex-shrink-0 flex-col gap-[60px] pb-[84px] text-neutral-off-black">
            {sortSectionKeys.map((sectionKey) => {
              const sectionConfig = fullSectionConfig[sectionKey];
              return (
                <div key={sectionKey} className="flex flex-col gap-8">
                  <Title>
                    <span className="text-h3">{sectionKey}</span>
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
