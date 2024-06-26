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

import { UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { useRedirect } from '@/hooks/router/useRedirect';
import { getHackathonStepInfo } from '../../constants';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';
import { LangContext } from '@/components/Provider/Lang';

import emitter from '@/store/emitter';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import MenuLink from '@/constants/MenuLink';

const formSchema = z.object({
  demo: z.string().url()
});
export type InfoFormSchema = z.infer<typeof formSchema>;

const ProjectDemo: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep' | 'tracks'> &
    Pick<HackathonSubmitStateType, 'projectDemo' | 'status' | 'isSubmit'>
> = ({ onNext, onBack, projectDemo, simpleHackathonInfo, projectId, status, isSubmit }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      demo: ''
    }
  });
  const [logo, setLogo] = useState<UploadFile | null>(null);
  const { redirectToUrl } = useRedirect();
  const { lang } = useContext(LangContext);

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  const { runAsync: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>, isExit = false) => {
      const { currentStep, nextStep } = getHackathonStepInfo(simpleHackathonInfo.id, status);

      const newStatus = currentStep.type === ProjectSubmitStepType.DEMO ? nextStep.type : status;

      const formData = new FormData();
      const { demo } = values;

      formData.append('demo', demo);
      formData.append('status', isExit ? ProjectSubmitStepType.DEMO : newStatus!);
      logo && formData.append('thumbnail', logo?.originFileObj as RcFile);

      const res = await webApi.resourceStationApi.submitProject(formData, projectId);
      return {
        res,
        status: newStatus,
        demo,
        isExit
      };
    },
    {
      manual: true,
      onSuccess({ res, demo, status, isExit }) {
        if (isExit) return;
        if (!res) return;
        if (!projectId || !isUuid(projectId)) {
          window.history.replaceState(
            {},
            window.location.host,
            `/${lang}/form/hackathon/${simpleHackathonInfo.id}/submission/${res.id}`
          );
        }

        onNext({ projectDemo: demo, status, projectId: res.id || projectId });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.demo === projectDemo) {
      onNext({ projectDemo: values.demo });
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    form.setValue('demo', projectDemo);
    if (projectDemo) form.trigger();
  }, [projectDemo]);

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
          <CustomFormField
            name="demo"
            form={form}
            label="Video Demo"
            placeholder="Link to the video demoing your project (preferably YouTube)"
          />

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
              // disabled={!form.formState.isValid || (!logo && !form.getValues('projectLogo'))}
              loading={loading}
              onClick={() => console.log(form.getValues())}
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

export default memo(ProjectDemo);
