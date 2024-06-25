'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useContext, useEffect, useRef, useState } from 'react';
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
import { LOCATIONS, TRACKS, getHackathonStepInfo } from '../../constants';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';
import { LangContext } from '@/components/Provider/Lang';
import { isEqual } from 'lodash-es';
import CustomSelectField from '@/components/Web/Business/CustomSelectField';
import ProjectTrackRadio from './ProjectTrackRadio';
import emitter from '@/store/emitter';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import MenuLink from '@/constants/MenuLink';
import FormRadio from '@/components/Common/FormRadio';
import FormRadioItem from '@/components/Common/FormRadio/FormRadioItem';

const formSchema = z.object({
  projectLogo: z.string().url(),
  projectName: z.string().min(1, {
    message: 'Project Name must be at least 2 characters.'
  }),
  location: z.string().min(1),
  prizeTrack: z.string().min(1),
  track: z.string().min(1),
  // track: z.string().min(2, {
  //   message: 'You need to select a track.'
  // }),
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
> = ({ onNext, onBack, info, tracks: prizeTrack, simpleHackathonInfo, projectId, status, isSubmit }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectLogo: '',
      projectName: '',
      intro: '',
      location: info.location,
      prizeTrack: info.prizeTrack,
      detailedIntro: '',
      track: info.track || ''
    }
  });
  const [logo, setLogo] = useState<UploadFile | null>(null);
  const { redirectToUrl } = useRedirect();
  const { lang } = useContext(LangContext);

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  const { runAsync: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>, isExit = false) => {
      const { currentStep, nextStep } = getHackathonStepInfo(simpleHackathonInfo.id, status);

      console.log(currentStep, nextStep);

      const newStatus = currentStep.type === ProjectSubmitStepType.INFO ? nextStep.type : status;

      const formData = new FormData();
      const { projectName, track, detailedIntro, intro, prizeTrack, location } = values;
      projectName && formData.append('name', projectName);
      prizeTrack && formData.append('prizeTrack', prizeTrack);
      (track || '').split(',').forEach((t) => {
        formData.append('tracks[]', t);
      });
      location && formData.append('location', location);
      detailedIntro && formData.append('description', detailedIntro);
      intro && formData.append('introduction', intro);
      formData.append('hackathonId', simpleHackathonInfo.id);
      formData.append('status', isExit ? ProjectSubmitStepType.INFO : newStatus!);
      logo && formData.append('thumbnail', logo?.originFileObj as RcFile);

      if (projectName) {
        const res = await webApi.resourceStationApi.submitProject(formData, projectId);
        return {
          res,
          status: newStatus,
          newInfo: {
            ...values
          },
          isExit
        };
      }
      return {
        status: newStatus,
        newInfo: {
          ...values
        },
        isExit
      };
    },
    {
      manual: true,
      onSuccess({ res, newInfo, status, isExit }) {
        if (isExit) return;
        if (!res) return;
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
    const { intro, detailedIntro, projectName, projectLogo, track, prizeTrack, location } = info!;
    form.setValue('intro', intro);
    form.setValue('detailedIntro', detailedIntro);
    form.setValue('projectName', projectName);
    form.setValue('projectLogo', projectLogo);
    form.setValue('track', track as string);
    form.setValue('location', location as string);
    form.setValue('prizeTrack', prizeTrack as string);
    if (intro && detailedIntro && projectName && projectLogo && track && location && prizeTrack) form.trigger();
  }, [info]);

  useEffect(() => {
    const exit = () => {
      exitConfirmRef.current?.open({
        onConfirm: async () => {
          await submitRequest(form.getValues(), true);
        },
        onConfirmCallback: () => redirectToUrl(`${MenuLink.HACKATHON_DASHBOARD}`)
      });
    };

    emitter.on('submit-form-exit', exit);
    return () => {
      emitter.off('submit-form-exit', exit);
    };
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
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
          <CustomSelectField
            form={form}
            label="Where are you located?"
            name="location"
            placeholder="Please select"
            items={LOCATIONS}
          ></CustomSelectField>
          {/* <ProjectPrizeTrackRadio tracks={tracks} form={form} /> */}
          <FormRadio
            name="prizeTrack"
            form={form}
            label="Which Prize Track Do You Belong To"
            multiple
            className={cn('flex-wrap', { '[&>div]:w-[calc((100%-20px)/2)]': prizeTrack.length > 1 })}
          >
            {prizeTrack.map((t) => (
              <FormRadioItem value={t} key={t} label={t} />
            ))}
          </FormRadio>
          <ProjectTrackRadio tracks={TRACKS} form={form} />

          {/* <div className="flex w-full justify-between gap-4">
            <div className="flex-1">
              <CustomSelectField
                form={form}
                label="Which Prize Track Do You Belong To"
                name="track"
                placeholder="Please select"
                items={TRACKS}
              />
            </div>
            <div className="flex-1">
              <CustomSelectField
                form={form}
                label="Which Hackathon Track Do You Belong To"
                name="prizeTrack"
                placeholder="Please select"
                items={tracks.map((track) => {
                  return {
                    label: track,
                    value: track
                  };
                })}
              />
            </div>
          </div> */}

          <IntroName form={form} />
          <DetailIntroName form={form} />
          <div className="flex justify-end gap-4">
            <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" disabled onClick={onBack}>
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
      <ConfirmModal ref={exitConfirmRef} confirmText={'Save & leave'}>
        <h4 className="text-h4 text-center text-neutral-black">Do you want to save the submission process & leave?</h4>
      </ConfirmModal>
    </div>
  );
};

export default memo(InfoForm);
