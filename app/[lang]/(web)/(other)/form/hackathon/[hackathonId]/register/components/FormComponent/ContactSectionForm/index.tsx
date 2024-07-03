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

interface ContactSectionFormProps {
  sectionConfig: (PresetComponentConfig<{}, {}> | CustomComponentConfig)[];
}

const ContactSectionForm: FC<ContactSectionFormProps & CommonFormComponentProps> = ({
  sectionConfig,
  info,
  isRegister,
  refreshRegisterInfo
}) => {
  const formSchema = useValidatorFormSchema(sectionConfig);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const contact = info.Contact;

  const { simpleHackathonInfo, onNext, onBack, hackathonSteps } = useHackathonConfig();
  const hackathonInfo = simpleHackathonInfo!;

  sectionConfig.sort((cfg) => {
    if (cfg.type === 'ResumeUpload') {
      return -1;
    } else return 1;
  });

  const { run: submitRequest, loading } = useRequest(
    async (values: Record<string, string>) => {
      const { nextStep } = getHackathonStepInfo(hackathonSteps as any, ApplicationSectionType.Contact);
      const state = {
        info: {
          ...omit(info, ApplicationSectionType.ApplicationType),
          [ApplicationSectionType.Contact]: values
        },
        status: nextStep.type
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
    form.trigger();
    debugger;
    const isSame = isEqual(values, contact);
    if (isSame) {
      onNext();
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    for (let key in contact) {
      form.setValue(key, contact[key] as string);
    }
    const propValues = Object.values(contact);
    const requiredCount = sectionConfig.filter((cfg) => !cfg.optional);
    if (propValues.length >= requiredCount.length) {
      form.trigger();
    }
  }, [contact]);

  console.log(form.getValues());

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
          <div className="flex flex-wrap gap-6">
            {sectionConfig.map((config, index) => {
              return (
                <div key={config.id} className="w-[calc(50%-12px)]">
                  <Fragment>{renderFormComponent(config as CustomComponentConfig, form)}</Fragment>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              htmlType="button"
              ghost
              className="button-text-m w-[165px] px-0 py-4 uppercase"
              disabled={hackathonSteps[0].type === ApplicationSectionType.Contact}
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
              // disabled={!form.formState.isValid}
            >
              {isRegister ? 'update' : 'Save'} And Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactSectionForm;
