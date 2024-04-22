'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { useHackathonSubmitStore } from '../../store';
import { HackathonRegisterStateType } from '../../../type';
import CustomFormField from '@/components/Web/Business/CustomFormField';

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
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> & { name: HackathonRegisterStateType['name'] }
> = ({ onNext, onBack }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  const setName = useHackathonSubmitStore((state) => state.setName);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setName(values.firstName + values.lastName);
    onNext({ name: { firstName: values.firstName, lastName: values.lastName } });
  }

  const disable = !!form.watch(['firstName', 'lastName']).filter((item) => !item.trim()).length;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex justify-between gap-4">
            <CustomFormField form={form} placeholder="Enter your first name" label="First Name" name={'firstName'} />
            <CustomFormField form={form} placeholder="Enter your last name" label="Last Name" name="lastName" />
          </div>
          <div className="flex justify-end gap-4">
            <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack}>
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

export default NameForm;
