'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, Fragment, useEffect } from 'react';
import { CommonFormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { getHackathonStepInfo } from '../../constants';
import { isEqual, omit } from 'lodash-es';
import {
  useHackathonConfig,
  useValidatorFormSchema
} from '@/components/HackathonCreation/Renderer/HackathonRendererProvider';
import {
  ApplicationSectionType,
  CustomComponentConfig,
  PresetComponentConfig
} from '@/components/HackathonCreation/type';
import { renderFormComponent } from '@/components/HackathonCreation/Renderer';

interface OnlineProfilesSectionFormProps {
  sectionConfig: (PresetComponentConfig<{}, {}> | CustomComponentConfig)[];
}

const OnlineProfilesSectionForm: FC<OnlineProfilesSectionFormProps & CommonFormComponentProps> = ({
  sectionConfig,
  info,
  isRegister,
  refreshRegisterInfo
}) => {
  const formSchema = useValidatorFormSchema(sectionConfig);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const onlineProfiles = info.OnlineProfiles;

  const { simpleHackathonInfo, onNext, onBack, hackathonSteps } = useHackathonConfig();
  const hackathonInfo = simpleHackathonInfo!;

  sectionConfig.sort((cfg) => {
    if (cfg.type === 'ResumeUpload') {
      return -1;
    } else return 1;
  });

  const { run: submitRequest, loading } = useRequest(
    async (values: Record<string, string>) => {
      const { nextStep } = getHackathonStepInfo(hackathonSteps as any, ApplicationSectionType.OnlineProfiles);
      const state = {
        info: {
          info: {
            ...omit(info, ApplicationSectionType.ApplicationType),
            [ApplicationSectionType.OnlineProfiles]: values
          }
        },
        status: nextStep.type
      };
      await webApi.resourceStationApi.updateHackathonRegisterInfo(hackathonInfo.id, state);
      // await refreshRegisterInfo();
      return state;
    },
    {
      manual: true,
      debounceWait: 300,
      onSuccess(state) {
        onNext(state);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: Record<string, string>) {
    form.trigger();
    const isSame = isEqual(values, onlineProfiles);
    if (isSame) {
      onNext();
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    for (let key in onlineProfiles) {
      form.setValue(key, onlineProfiles[key] as string);
    }
    const propValues = Object.values(onlineProfiles);
    const requiredCount = sectionConfig.filter((cfg) => !cfg.optional);
    if (propValues.length >= requiredCount.length) {
      form.trigger();
    }
  }, [onlineProfiles]);

  console.log(form.getValues());

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
          <div
            className="flex flex-wrap gap-6
          "
          >
            {/* [&>div]:w-[calc(50%-12px)] */}
            {sectionConfig.map((config, index) => {
              return <Fragment key={config.id}>{renderFormComponent(config as CustomComponentConfig, form)}</Fragment>;
            })}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              htmlType="button"
              ghost
              className="button-text-m w-[165px] px-0 py-4 uppercase"
              disabled={hackathonSteps[0].type === ApplicationSectionType.OnlineProfiles}
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
              onClick={(e) => {
                e.preventDefault();
                onSubmit(form.getValues());
              }}
              disabled={!form.formState.isValid}
            >
              {isRegister ? 'update' : 'Save'} And Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OnlineProfilesSectionForm;
