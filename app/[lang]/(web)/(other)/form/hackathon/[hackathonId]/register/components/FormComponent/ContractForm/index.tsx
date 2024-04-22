'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { HackathonRegisterStateType } from '../../../type';
import CustomFormField from '@/components/Web/Business/CustomFormField';

const formSchema = z.object({
  weChat: z.string().min(2, {
    message: 'WeChat must be at least 2 characters.'
  }),
  telegram: z.string().min(2, {
    message: 'Telegram must be at least 2 characters.'
  })
});

const ContractForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> & {
    contractInfo: HackathonRegisterStateType['contractInfo'];
  }
> = ({ onNext, onBack }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weChat: '',
      telegram: ''
    }
  });

  // const setContractInfo = useHackathonSubmitStore((state) => state.setContractInfo);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setContractInfo();
    onNext({
      contractInfo: {
        wechat: values.weChat,
        telegram: values.telegram
      }
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-left">
            <p className="body-l text-neutral-off-black">Please provide at least one contact information</p>
            <CustomFormField form={form} placeholder="Enter your WeChat account" label="WeChat" name={'weChat'} />
            <CustomFormField form={form} placeholder="Enter your Telegram account" label="Telegram" name="telegram" />
          </div>
          <div className="flex justify-end gap-4">
            <Button ghost className="w-[165px] px-0 py-4 uppercase" onClick={onBack}>
              Back
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className={cn('w-[165px] px-0 py-4 uppercase', !form.formState.isValid ? 'bg-neutral-light-gray' : '')}
              disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default memo(ContractForm);
