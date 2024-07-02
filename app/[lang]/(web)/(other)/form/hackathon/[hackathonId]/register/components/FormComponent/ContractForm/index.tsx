'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useEffect } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { HackathonRegisterStateType } from '../../../type';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { errorMessage } from '@/helper/ui';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { HackathonRegisterStep } from '@/service/webApi/resourceStation/type';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { isEqual } from 'lodash-es';
import { HackathonPartner } from '../../../../submission/[projectId]/components/constants';

const ContractForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> &
    Pick<HackathonRegisterStateType, 'contractInfo' | 'status' | 'isRegister'>
> = ({ onNext, onBack, contractInfo, simpleHackathonInfo, status, isRegister }) => {
  const formSchema = z
    .object({
      email: z.string().email(),
      weChat: z.string().optional(),
      telegram: z.string().optional(),
      discord: z.string().optional(),
      collegeName: z.string().optional()
    })
    .refine(
      (data) => {
        if (simpleHackathonInfo.id !== HackathonPartner.Hack4Bengal) {
          return !!data.weChat || !!data.telegram;
        } else {
          return !!data.discord && !!data.collegeName;
        }
      },
      {
        message: 'At least one input must be filled',
        path: ['weChat', 'telegram']
      }
    );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: contractInfo
  });

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 1
          ? HackathonRegisterStep.Bio
          : status;
      const res = await webApi.resourceStationApi.updateHackathonRegisterInfo(simpleHackathonInfo.id, {
        email: values.email,
        weChat: values.weChat,
        telegram: values.telegram,
        discord: values.discord,
        collegeName: values.collegeName,
        status: newStatus
      });
      return { res, values, status: newStatus };
    },
    {
      manual: true,
      onSuccess({ res, values, status }) {
        onNext({ contractInfo: { weChat: values.weChat, telegram: values.telegram, email: values.email }, status });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setContractInfo();

    if (isEqual(values, contractInfo)) {
      onNext({ contractInfo: values });
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    form.setValue('email', contractInfo.email || '');
    form.setValue('weChat', contractInfo.weChat);
    form.setValue('telegram', contractInfo.telegram);
    form.setValue('discord', contractInfo.discord);
    form.setValue('collegeName', contractInfo.collegeName);
    if (
      contractInfo.email &&
      (contractInfo.weChat || simpleHackathonInfo.id === HackathonPartner.Hack4Bengal) &&
      contractInfo.telegram &&
      (contractInfo.discord || simpleHackathonInfo.id !== HackathonPartner.Hack4Bengal) &&
      (contractInfo.collegeName || simpleHackathonInfo.id !== HackathonPartner.Hack4Bengal)
    )
      form.trigger();
  }, [contractInfo]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-left">
            <p className="body-l text-neutral-off-black">Please provide at least two contact information</p>
            <CustomFormField
              form={form}
              placeholder="Enter your Email address"
              label="Email*"
              name={'email'}
              onBlur={() => {
                if (!!form.getValues('email')?.trim()) form.trigger('email');
              }}
            />
            {simpleHackathonInfo.id !== HackathonPartner.Hack4Bengal && (
              <CustomFormField
                form={form}
                placeholder="Enter your WeChat account"
                label="WeChat (optional)"
                name={'weChat'}
              />
            )}

            {simpleHackathonInfo.id === HackathonPartner.Hack4Bengal && (
              <CustomFormField form={form} placeholder="Enter your Discord account" label="Discord*" name="discord" />
            )}
            {simpleHackathonInfo.id === HackathonPartner.Hack4Bengal && (
              <CustomFormField
                form={form}
                placeholder="Enter your college name"
                label="College name*"
                name="collegeName"
              />
            )}
            <CustomFormField
              form={form}
              placeholder="Enter your Telegram account"
              label="Telegram (optional)"
              name="telegram"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button htmlType="button" ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack}>
              Back
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className={cn(
                'button-text-m min-w-[165px] px-0 py-4 uppercase',
                !form.formState.isValid ? 'bg-neutral-light-gray' : ''
              )}
              disabled={!form.formState.isValid}
              loading={loading}
            >
              {isRegister ? 'update' : 'Save'} And Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default memo(ContractForm);
