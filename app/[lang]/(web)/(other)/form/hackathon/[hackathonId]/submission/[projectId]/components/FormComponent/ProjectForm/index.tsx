'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useEffect } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { HackathonSubmitStateType } from '../../../type';
import { useRequest } from 'ahooks';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import FormRadio from '@/components/Common/FormRadio';
import FormRadioItem from '@/components/Common/FormRadio/FormRadioItem';

const formSchema = z.object({
  submitType: z.string().min(0),
  efrog: z.boolean(),
  croak: z.boolean()
});

export type ProjectFormSchema = z.infer<typeof formSchema>;

const ProjectForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep' | 'tracks'> &
    Pick<HackathonSubmitStateType, 'project' | 'status' | 'isSubmit'>
> = ({ onNext, onBack, project, status, projectId, refreshProjectInfo, isSubmit }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      efrog: undefined,
      croak: undefined,
      submitType: ''
    }
  });

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 1
          ? ProjectSubmitStepType.PITCH_VIDEO
          : status;
      debugger;
      const formData = new FormData();
      const { efrog, croak, submitType } = values;
      formData.append('efrog', efrog ? 'true' : 'false');
      formData.append('croak', croak ? 'true' : 'false');
      formData.append('submitType', submitType || '');
      formData.append('status', newStatus);

      const res = await webApi.resourceStationApi.submitProject(formData, projectId);
      await refreshProjectInfo();
      return {
        res,
        status: newStatus,
        newProject: {
          efrog,
          croak,
          submitType
        }
      };
    },
    {
      manual: true,
      onSuccess({ res, newProject, status }) {
        onNext({ project: newProject, status });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitRequest(values);
  }

  useEffect(() => {
    const { efrog, croak, submitType } = project!;
    submitType && form.setValue('submitType', submitType);
    typeof efrog === 'boolean' && form.setValue('efrog', !!efrog);
    typeof croak === 'boolean' && form.setValue('croak', !!croak);
    if (submitType && typeof efrog === 'boolean' && typeof croak === 'boolean') form.trigger();
  }, [project]);

  const disable =
    typeof form.getValues('efrog') !== 'boolean' ||
    typeof form.getValues('croak') !== 'boolean' ||
    !form.getValues('submitType');

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormRadio name="efrog" label="Did you incorporate efrog NFT into your project?" form={form}>
            <FormRadioItem label="Yes" value={true} />
            <FormRadioItem label="No" value={false} />
          </FormRadio>
          <FormRadio name="croak" label="Did you use $CROAK memecoin for utility in your project?" form={form}>
            <FormRadioItem label="Yes" value={true} />
            <FormRadioItem label="No" value={false} />
          </FormRadio>
          <FormRadio name="submitType" label="What are you submitting?" form={form}>
            <FormRadioItem label="A tutorial guide" value={`A tutorial guide`} />
            <FormRadioItem label="A dapp or frame" value={`A dapp or frame`} />
            <FormRadioItem label="Other" value={`Other`} />
          </FormRadio>

          <div className="flex justify-end gap-4">
            <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack}>
              Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={cn('button-text-m w-[165px] px-0 py-4 uppercase', disable ? 'bg-neutral-light-gray' : '')}
              disabled={disable}
              loading={loading}
            >
              {isSubmit ? 'update' : 'Save'} and Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default memo(ProjectForm);