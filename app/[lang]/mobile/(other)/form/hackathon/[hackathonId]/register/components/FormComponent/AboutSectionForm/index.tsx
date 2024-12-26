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
import ConfirmModal from '@/components/Web/Business/ConfirmModal';
import { useFormExit } from '@/hooks/hackathon/useFormExit';
import { useSearchParams } from 'next/navigation';

interface AboutSectionFormProps {
  sectionConfig: (PresetComponentConfig<{}, {}> | CustomComponentConfig)[];
}

const AboutSectionForm: FC<AboutSectionFormProps & CommonFormComponentProps> = ({
  sectionConfig,
  info,
  isRegister,
  refreshRegisterInfo
}) => {
  const formSchema = useValidatorFormSchema(sectionConfig);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const about = info.About;
  const query = useSearchParams();
  const { simpleHackathonInfo, onNext, onBack, hackathonSteps } = useHackathonConfig();
  const hackathonInfo = simpleHackathonInfo!;

  sectionConfig.sort((cfg) => {
    if (cfg.type === 'ResumeUpload') {
      return -1;
    } else return 1;
  });

  const { runAsync: submitRequest, loading } = useRequest(
    async (values: Record<string, string>, isExit = false) => {
      // form.trigger();
      const { nextStep } = getHackathonStepInfo(hackathonSteps as any, ApplicationSectionType.About);
      const state = {
        info: {
          ...omit(info, ApplicationSectionType.ApplicationType),
          [ApplicationSectionType.About]: values
        },
        status: isExit ? (form.formState.isValid ? nextStep.type : ApplicationSectionType.About) : nextStep.type
      };
      await webApi.resourceStationApi.updateHackathonRegisterInfo(hackathonInfo.id, state);
      // await refreshRegisterInfo();
      return state;
    },
    {
      manual: true,
      onSuccess(state) {
        onNext(state);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: Record<string, string>) {
    const isSame = isEqual(values, about);
    if (isSame) {
      onNext();
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    for (let key in about) {
      form.setValue(key, about[key] as string);
    }
    const propValues = Object.values(about);
    const requiredCount = sectionConfig.filter((cfg) => !cfg.optional);
    if (propValues.length >= requiredCount.length) {
      form.trigger();
    }
  }, [about]);

  const exitConfirmRef = useFormExit(() => submitRequest(form.getValues(), true));

  return (
    <div className="pb-[120px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {sectionConfig.map((config, index) => {
              return <Fragment key={index}>{renderFormComponent(config as CustomComponentConfig, form)}</Fragment>;
            })}
          </div>
          <div className="max-w-screen fixed bottom-5 flex w-full gap-[.625rem]">
            <Button
              htmlType="button"
              className="button-text-m w-[calc((100%-16px-40px)/2)] bg-neutral-light-gray px-0 py-4 uppercase text-neutral-medium-gray opacity-100"
              disabled={hackathonSteps[0].type === ApplicationSectionType.About}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className={cn(
                'button-text-m w-[calc((100%-10px-40px)/2)] px-0 py-4 uppercase opacity-100',
                !form.formState.isValid ? 'bg-neutral-light-gray text-neutral-medium-gray' : ''
              )}
              disabled={!form.formState.isValid}
            >
              {isRegister ? 'update' : 'Save'} And Next
            </Button>
          </div>
        </form>
      </Form>
      <ConfirmModal ref={exitConfirmRef} confirmText={'Save & leave'}>
        <h4 className="text-h4 text-center text-neutral-black">Do you want to save the register process & leave?</h4>
      </ConfirmModal>
    </div>
  );
};

export default AboutSectionForm;
