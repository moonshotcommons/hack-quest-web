'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { HackathonSubmitStateType } from '../../../type';

import LogoUpload from './LogoUpload';
import ProjectTrackRadio from './ProjectTrackRadio';
import IntroName from './IntroName';
import DetailIntroName from './DetailIntroName';

const formSchema = z.object({
  projectLogo: z.string().min(10, {
    message: 'The project Logo must be uploaded.'
  }),
  projectName: z.string().min(2, {
    message: 'Project Name must be at least 2 characters.'
  }),
  track: z.string(),
  intro: z
    .string()
    .min(2, {
      message: 'Intro must be at least 2 characters.'
    })
    .max(120, {
      message: 'The intro field cannot exceed 160 characters'
    }),
  detailedIntro: z
    .string()
    .min(16, {
      message: 'detailedIntro must be at least 16 characters.'
    })
    .max(600, {
      message: 'The detailed intro field cannot exceed 600 characters'
    })
});

export type InfoFormSchema = z.infer<typeof formSchema>;

const InfoForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> & {
    info: HackathonSubmitStateType['info'];
  }
> = ({ onNext, onBack }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectLogo: '',
      projectName: '',
      intro: '',
      detailedIntro: ''
    }
  });

  // const setContractInfo = useHackathonSubmitStore((state) => state.setContractInfo);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setContractInfo();
    onNext({});
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex justify-between gap-4">
            <LogoUpload />
            <div className="flex-1">
              <CustomFormField
                name="projectName"
                form={form}
                label="Project Name"
                placeholder="Enter your project name"
              />
            </div>
          </div>
          <ProjectTrackRadio form={form} />
          <IntroName form={form} />
          <DetailIntroName form={form} />
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

export default memo(InfoForm);
