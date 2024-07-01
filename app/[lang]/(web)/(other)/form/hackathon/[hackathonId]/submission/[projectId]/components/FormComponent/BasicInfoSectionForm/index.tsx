'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, Fragment, useEffect, useRef } from 'react';
import { CommonFormComponentProps } from '..';
import { cn, isUuid } from '@/helper/utils';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { getHackathonStepInfo, getHackathonSubmissionSteps } from '../../constants';
import { isEqual } from 'lodash-es';
import {
  useHackathonConfig,
  useValidatorFormSchema
} from '@/components/HackathonCreation/Renderer/HackathonRendererProvider';
import {
  CustomComponentConfig,
  PresetComponentConfig,
  SubmissionSectionType
} from '@/components/HackathonCreation/type';
import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { useLang } from '@/components/Provider/Lang';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import { ProjectSubmitStateType } from '../../../type';
import { omit } from 'lodash-es';

interface BasicInfoSectionFormProps {
  sectionConfig: (PresetComponentConfig<{}, {}> | CustomComponentConfig)[];
  basicInfo: ProjectSubmitStateType['BasicInfo'];
}

const BasicInfoSectionForm: FC<BasicInfoSectionFormProps & CommonFormComponentProps> = ({
  sectionConfig,
  basicInfo,
  projectId,
  isSubmit
}) => {
  const formSchema = useValidatorFormSchema(sectionConfig);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { lang } = useLang();

  const { simpleHackathonInfo, onNext, onBack, hackathonSteps } = useHackathonConfig();
  const hackathonInfo = simpleHackathonInfo!;

  const { run: submitRequest, loading } = useRequest(
    async (values: Record<string, string>, isExit = false) => {
      const { nextStep } = getHackathonStepInfo(
        hackathonSteps as ReturnType<typeof getHackathonSubmissionSteps>,
        SubmissionSectionType.BasicInfo
      );

      const fields: Record<string, any> = {};
      const info: Record<string, any> = {};

      Object.keys(values).forEach((key) => {
        if (isUuid(key)) {
          const config = sectionConfig.find((cfg) => cfg.id === key)!;
          fields[key] = {
            label: (config as CustomComponentConfig).property.label,
            value: values[key]
          };
        } else {
          info[key] = values[key];
        }
      });

      info.tracks = values.tracks ? values.tracks.split(',') : [];

      const state = {
        basicInfo: {
          ...info,
          fields
        },
        hackathonId: hackathonInfo.id,
        status: isExit ? SubmissionSectionType.BasicInfo : nextStep.type
      };

      let result = {
        state: {
          ...omit(state, ['basicInfo']),
          BasicInfo: state.basicInfo
        },
        isExit,
        res: { id: '' }
      };

      if (values.name) {
        const res = await webApi.resourceStationApi.submitProject(state, projectId);
        result.res = res;
      }

      return result;
    },
    {
      manual: true,
      debounceWait: 300,
      onSuccess({ res, state, isExit }) {
        if (isExit) return;
        if (!res) return;
        if ((!projectId || !isUuid(projectId)) && res.id) {
          window.history.replaceState(
            {},
            window.location.host,
            `/${lang}/form/hackathon/${hackathonInfo.id}/submission/${res.id}`
          );
        }
        onNext({ ...state, projectId: res.id || projectId });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: Record<string, string>) {
    const isSame = isEqual(values, basicInfo);
    if (isSame) {
      onNext();
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    for (let key in basicInfo) {
      switch (key) {
        case 'tracks':
          basicInfo[key] && form.setValue(key, basicInfo[key]!.join(','));
          break;
        case 'fields':
          for (let k in basicInfo[key] || {}) {
            basicInfo[key] && form.setValue(k, basicInfo[key]![k].value);
          }
        default:
          form.setValue(key, basicInfo[key]);
          break;
      }
    }

    const propValues = Object.values(basicInfo);
    const requiredCount = sectionConfig.filter((cfg) => !cfg.optional);
    if (propValues.length >= requiredCount.length) {
      form.trigger();
    }
  }, [basicInfo]);

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {sectionConfig.map((config, index) => {
              return <Fragment key={index}>{renderFormComponent(config as CustomComponentConfig, form)}</Fragment>;
            })}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              htmlType="button"
              ghost
              className="button-text-m w-[165px] px-0 py-4 uppercase"
              disabled={hackathonSteps[0].type === SubmissionSectionType.BasicInfo}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className={cn(
                'button-text-m min-w-[165px] px-0 py-4 uppercase',
                !form.formState.isValid ? 'bg-neutral-light-gray' : ''
              )}
              // onClick={(e) => {
              //   e.preventDefault();
              //   onSubmit(form.getValues());
              // }}
              disabled={!form.formState.isValid}
            >
              {isSubmit ? 'update' : 'Save'} And Next
            </Button>
          </div>
        </form>
      </Form>
      <ConfirmModal ref={exitConfirmRef} confirmText={'Save & leave'}>
        <h4 className="text-h4 text-center text-neutral-black">Do you want to save the submission process & leave?</h4>
      </ConfirmModal>
    </div>
  );
};

export default BasicInfoSectionForm;
