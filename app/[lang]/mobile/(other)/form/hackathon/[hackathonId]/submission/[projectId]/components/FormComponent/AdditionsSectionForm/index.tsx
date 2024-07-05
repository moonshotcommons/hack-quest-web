'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, Fragment, useEffect } from 'react';
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
import ConfirmModal from '@/components/Web/Business/ConfirmModal';
import { ProjectSubmitStateType } from '../../../type';
import { omit } from 'lodash-es';
import { useFormExit } from '@/hooks/hackathon/useFormExit';

interface AdditionsSectionFormProps {
  sectionConfig: (PresetComponentConfig<{}, {}> | CustomComponentConfig)[];
  additions: ProjectSubmitStateType['Additions'];
}

const AdditionsSectionForm: FC<AdditionsSectionFormProps & CommonFormComponentProps> = ({
  sectionConfig,
  additions,
  projectId,
  isSubmit,
  refreshProjectInfo
}) => {
  const formSchema = useValidatorFormSchema(sectionConfig);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { lang } = useLang();

  const { simpleHackathonInfo, onNext, onBack, hackathonSteps } = useHackathonConfig();
  const hackathonInfo = simpleHackathonInfo!;

  const { runAsync: submitRequest, loading } = useRequest(
    async (values: Record<string, string>, isExit = false) => {
      const { nextStep } = getHackathonStepInfo(
        hackathonSteps as ReturnType<typeof getHackathonSubmissionSteps>,
        SubmissionSectionType.Additions
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

      const state = {
        additions: {
          ...info,
          fields
        },
        hackathonId: hackathonInfo.id,
        status: isExit ? SubmissionSectionType.Additions : nextStep.type
      };

      const res = await webApi.resourceStationApi.submitProject(state, projectId);
      await refreshProjectInfo();
      let result = {
        state: {
          ...omit(state, ['additions']),
          Additions: state.additions
        },
        isExit,
        res
      };

      return result;
    },
    {
      manual: true,
      debounceWait: 300,
      onSuccess({ res, state, isExit }) {
        if (isExit) return;
        onNext(state);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: Record<string, string>) {
    debugger;
    const isSame = isEqual(values, additions);
    if (isSame) {
      onNext();
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    for (let key in additions) {
      switch (key) {
        case 'id':
          break;
        case 'fields':
          for (let k in additions[key] || {}) {
            additions[key] && form.setValue(k, additions[key]![k].value);
          }
        default:
          form.setValue(key, additions[key]);
          break;
      }
    }

    const propValues = Object.values(additions);
    const requiredCount = sectionConfig.filter((cfg) => !cfg.optional);
    if (propValues.length >= requiredCount.length) {
      form.trigger();
    }
  }, [additions]);

  const exitConfirmRef = useFormExit(() => submitRequest(form.getValues(), true));

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
              disabled={hackathonSteps[0].type === SubmissionSectionType.Additions}
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

export default AdditionsSectionForm;
