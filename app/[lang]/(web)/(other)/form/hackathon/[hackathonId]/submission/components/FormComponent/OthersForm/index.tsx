'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useEffect } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { HackathonSubmitStateType } from '../../../type';
import IsPublicRadio from './IsPublicRadio';

const formSchema = z.object({
  githubLink: z.string().min(2, {
    message: 'Github link must be at least 2 characters.'
  }),
  isPublic: z.boolean()
});

export type OthersFormSchema = z.infer<typeof formSchema>;

const OthersForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> & {
    others: HackathonSubmitStateType['others'];
  }
> = ({ onNext, onBack, others }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubLink: '',
      isPublic: undefined
    }
  });

  // const setContractInfo = useHackathonSubmitStore((state) => state.setContractInfo);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setContractInfo();
    onNext({});
  }

  useEffect(() => {
    const { githubLink, isPublic } = others;
    form.setValue('githubLink', githubLink);
    // form.setValue('isPublic', 'No');

    if (githubLink) form.trigger();
  }, [others]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CustomFormField
            name="githubLink"
            form={form}
            label="Please Provide The Github Of Your Project"
            placeholder="Paste Github link here"
          />
          <IsPublicRadio form={form} />
          <div className="flex justify-end gap-4">
            <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack}>
              Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={cn(
                'button-text-m w-[165px] px-0 py-4 uppercase',
                !form.formState.isValid ? 'bg-neutral-light-gray' : ''
              )}
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

export default memo(OthersForm);
