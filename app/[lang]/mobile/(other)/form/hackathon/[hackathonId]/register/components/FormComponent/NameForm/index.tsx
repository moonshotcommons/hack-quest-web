'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, useEffect } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { HackathonRegisterStateType } from '../../../type';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { HackathonRegisterStep } from '@/service/webApi/resourceStation/type';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { isEqual } from 'lodash-es';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'FirstName must be at least 2 characters.'
  }),
  lastName: z.string().min(2, {
    message: 'LastName must be at least 2 characters.'
  })
});

interface NameFormProps {
  onNext: VoidFunction;
  onBack: VoidFunction;
}

const NameForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> &
    Pick<HackathonRegisterStateType, 'name' | 'status' | 'isRegister'>
> = ({ onNext, onBack, simpleHackathonInfo, name, status, isRegister }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: name
  });

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 0
          ? HackathonRegisterStep.Contact
          : status;

      const res = await webApi.resourceStationApi.updateHackathonRegisterInfo(simpleHackathonInfo.id, {
        firstName: values.firstName,
        lastName: values.lastName,
        status: newStatus
      });
      return { res, values, status: newStatus };
    },
    {
      manual: true,
      onSuccess({ res, values, status }) {
        onNext({ name: { firstName: values.firstName, lastName: values.lastName }, status });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const isSame = isEqual(values, name);
    if (isSame) {
      onNext({ name: { firstName: values.firstName, lastName: values.lastName } });
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    form.setValue('firstName', name.firstName);
    form.setValue('lastName', name.lastName);
    if (name.firstName && name.lastName) form.trigger();
  }, [name]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <CustomFormField form={form} placeholder="Enter your first name" label="First Name" name={'firstName'} />
            <CustomFormField form={form} placeholder="Enter your last name" label="Last Name" name="lastName" />
          </div>
          <div className="max-w-screen fixed bottom-5 flex w-full gap-[.625rem]">
            <Button
              htmlType="button"
              ghost
              className="button-text-m w-[calc((100%-16px-40px)/2)] bg-neutral-black px-0 py-4 uppercase text-white"
              disabled
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className={cn(
                'button-text-m w-[calc((100%-10px-40px)/2)] px-0 py-4 uppercase',
                !form.formState.isValid ? 'bg-neutral-light-gray' : ''
              )}
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

export default NameForm;
