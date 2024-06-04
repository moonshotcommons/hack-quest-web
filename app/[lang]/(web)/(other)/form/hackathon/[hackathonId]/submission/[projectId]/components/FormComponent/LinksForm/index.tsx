'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useEffect } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { HackathonSubmitStateType } from '../../../type';
import { useRequest } from 'ahooks';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  contractLink: z.string().url(),
  projectLink: z.string().url(),
  socialLink: z.string().url(),
  partnerTooling: z.string().min(1).max(360)
});

export type OthersFormSchema = z.infer<typeof formSchema>;

const OthersForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep' | 'tracks'> &
    Pick<HackathonSubmitStateType, 'links' | 'status' | 'isSubmit'>
> = ({ onNext, onBack, links, status, projectId, refreshProjectInfo, isSubmit }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractLink: '',
      projectLink: '',
      socialLink: '',
      partnerTooling: ''
    }
  });

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 4
          ? ProjectSubmitStepType.OTHERS
          : status;
      debugger;
      const formData = new FormData();

      formData.append('links', JSON.stringify(values));
      formData.append('status', newStatus);

      const res = await webApi.resourceStationApi.submitProject(formData, projectId);
      await refreshProjectInfo();
      return {
        res,
        status: newStatus,
        newLinks: values
      };
    },
    {
      manual: true,
      onSuccess({ res, newLinks, status }) {
        onNext({ links: newLinks, status });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setContractInfo();

    submitRequest(values);
  }

  useEffect(() => {
    Object.keys(links || {}).forEach((key: any) => {
      form.setValue(key, links[key as keyof typeof links]);
    });

    if (Object.values(links).every((item) => !!item)) form.trigger();
  }, [links]);

  const disable =
    !form.watch('contractLink') ||
    !form.watch('projectLink') ||
    !form.watch('socialLink') ||
    !form.watch('partnerTooling');

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CustomFormField
            name="contractLink"
            form={form}
            label={
              <span>
                Please link to your verified contract on{' '}
                <Link
                  href={'https://sepolia.lineascan.build/'}
                  target="_blank"
                  className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-primary"
                >
                  Linea Sepolia
                </Link>{' '}
                or{' '}
                <Link
                  href={'https://lineascan.build/'}
                  target="_blank"
                  className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-primary"
                >
                  Linea Mainnet
                </Link>
                .{' '}
              </span>
            }
            placeholder="Please enter a URL"
          />
          <CustomFormField
            name="projectLink"
            form={form}
            label="Please link to your project, so that we can play around with it!"
            placeholder="Please enter a URL"
          />
          <CustomFormField
            name="socialLink"
            form={form}
            label={
              <span className="flex flex-col">
                <span>Please link to a social post you made about your project.</span>
                <span className="body-s text-[.875rem] leading-[160%] text-neutral-medium-gray">
                  Tag @lineabuild and @HackQuest_ on X
                </span>
              </span>
            }
            placeholder="Please enter a URL"
          />

          <FormField
            control={form.control}
            name={'partnerTooling'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    <span>
                      Please list any{' '}
                      <Link
                        href={'https://docs.linea.build/developers/tooling'}
                        target="_blank"
                        className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-primary"
                      >
                        partner tooling
                      </Link>{' '}
                      you incorporated and how you did it for bonus points.
                    </span>
                  </FormLabel>
                  <span className="caption-14pt text-neutral-rich-gray">
                    <span className={form.watch('partnerTooling').length > 360 ? 'text-status-error' : ''}>
                      {form.watch('partnerTooling').length}
                    </span>
                    /360
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Please list the partner tooling and enter the description"
                    {...field}
                    className="body-m !mt-1 box-border flex h-[76px] min-h-[76px] items-center border-neutral-light-gray !py-[11px] px-6 text-[16px] font-normal leading-[160%] text-neutral-medium-gray"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default memo(OthersForm);
