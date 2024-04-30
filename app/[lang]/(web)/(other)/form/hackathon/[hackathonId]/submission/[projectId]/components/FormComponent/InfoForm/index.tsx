'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useContext, useEffect, useState } from 'react';
import { FormComponentProps } from '..';
import { cn, isUuid } from '@/helper/utils';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { HackathonSubmitStateType } from '../../../type';

import LogoUpload from './LogoUpload';
import IntroName from './IntroName';
import DetailIntroName from './DetailIntroName';
import { UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { useRedirect } from '@/hooks/router/useRedirect';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';
import { LangContext } from '@/components/Provider/Lang';
import { isEqual } from 'lodash-es';
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from '@/components/ui/select';

const formSchema = z.object({
  projectLogo: z.string().url(),
  projectName: z.string().min(1, {
    message: 'Project Name must be at least 2 characters.'
  }),
  track: z.string().min(2, {
    message: 'You need to select a track.'
  }),
  intro: z
    .string()
    .min(1, {
      message: 'Intro must be at least 2 characters.'
    })
    .max(120, {
      message: 'The intro field cannot exceed 160 characters'
    }),
  detailedIntro: z
    .string()
    .min(1, {
      message: 'detailedIntro must be at least 16 characters.'
    })
    .max(600, {
      message: 'The detailed intro field cannot exceed 600 characters'
    })
});
export type InfoFormSchema = z.infer<typeof formSchema>;

const InfoForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> &
    Pick<HackathonSubmitStateType, 'info' | 'status' | 'isSubmit'>
> = ({ onNext, onBack, info, tracks, simpleHackathonInfo, projectId, status, isSubmit }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectLogo: '',
      projectName: '',
      intro: '',
      detailedIntro: '',
      track: ''
    }
  });
  const [logo, setLogo] = useState<UploadFile | null>(null);

  const { redirectToUrl } = useRedirect();

  const { lang } = useContext(LangContext);

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 0
          ? ProjectSubmitStepType.PITCH_VIDEO
          : status;

      const formData = new FormData();
      const { projectName, track, detailedIntro, intro } = values;
      formData.append('name', projectName);
      formData.append('prizeTrack', track);
      formData.append('description', detailedIntro);
      formData.append('introduction', intro);
      formData.append('hackathonId', simpleHackathonInfo.id);
      formData.append('status', newStatus!);
      logo && formData.append('thumbnail', logo?.originFileObj as RcFile);
      const res = await webApi.resourceStationApi.submitProject(formData, projectId);
      return {
        res,
        status: newStatus,
        newInfo: {
          ...values
        }
      };
    },
    {
      manual: true,
      onSuccess({ res, newInfo, status }) {
        if (!projectId || !isUuid(projectId)) {
          window.history.replaceState(
            {},
            window.location.host,
            `/${lang}/form/hackathon/${simpleHackathonInfo.id}/submission/${res.id}`
          );
        }

        onNext({ info: newInfo, status, projectId: res.id || projectId });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const isSame = isEqual(values, info);
    if (isSame) {
      onNext({ info: values });
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    const { intro, detailedIntro, projectName, projectLogo, track } = info!;
    form.setValue('intro', intro);
    form.setValue('detailedIntro', detailedIntro);
    form.setValue('projectName', projectName);
    form.setValue('projectLogo', projectLogo);
    form.setValue('track', track as string);
    if (intro && detailedIntro && projectName && projectLogo && track) form.trigger();
  }, [info]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex justify-between gap-4">
            <LogoUpload form={form} onFileChange={setLogo} />
            <div className="flex-1">
              <CustomFormField
                name="projectName"
                form={form}
                label="Project Name"
                placeholder="Enter your project name"
              />
            </div>
          </div>
          {/* <ProjectTrackRadio form={form} tracks={tracks} /> */}
          <FormField
            control={form.control}
            name="track"
            render={({ field }) => (
              <FormItem onChange={() => {}}>
                <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                  Email
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="!body-m h-[50px] px-3">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <IntroName form={form} />
          <DetailIntroName form={form} />
          <div className="flex justify-end gap-4">
            <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack}>
              Back
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className={cn(
                'button-text-m w-[165px] px-0 py-4 uppercase',
                !form.formState.isValid || (!logo && !form.getValues('projectLogo')) ? 'bg-neutral-light-gray' : ''
              )}
              disabled={!form.formState.isValid || (!logo && !form.getValues('projectLogo'))}
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

export default memo(InfoForm);
