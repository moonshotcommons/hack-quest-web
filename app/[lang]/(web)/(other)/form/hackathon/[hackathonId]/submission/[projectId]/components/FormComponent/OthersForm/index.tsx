'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useEffect, useRef } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { HackathonSubmitStateType } from '../../../type';
import IsPublicRadio from './IsPublicRadio';
import { useRequest } from 'ahooks';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { useRedirect } from '@/hooks/router/useRedirect';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import emitter from '@/store/emitter';
import MenuLink from '@/constants/MenuLink';

const formSchema = z.object({
  githubLink: z.string().min(0).optional(),
  isPublic: z.boolean()
});

export type OthersFormSchema = z.infer<typeof formSchema>;

const OthersForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep' | 'tracks'> &
    Pick<HackathonSubmitStateType, 'others' | 'status' | 'isSubmit'>
> = ({ onNext, onBack, others, status, projectId, refreshProjectInfo, isSubmit }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubLink: '',
      isPublic: undefined
    }
  });

  const { redirectToUrl } = useRedirect();
  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>, isExit = false) => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 5
          ? ProjectSubmitStepType.WALLET
          : status;
      debugger;
      const formData = new FormData();
      const { githubLink, isPublic } = values;
      formData.append('isOpenSource', isPublic ? 'true' : 'false');
      formData.append('githubLink', githubLink || '');
      formData.append('status', isExit ? ProjectSubmitStepType.OTHERS : newStatus!);

      const res = await webApi.resourceStationApi.submitProject(formData, projectId);
      await refreshProjectInfo();
      return {
        res,
        status: newStatus,
        newOtherInfo: {
          isPublic,
          githubLink: githubLink || ''
        }
      };
    },
    {
      manual: true,
      onSuccess({ res, newOtherInfo, status }) {
        onNext({ others: newOtherInfo, status });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setContractInfo();
    if (
      form.getValues('isPublic') === true &&
      !/^https?:\/\/(www\.)?github\.com\/[^/]+\/.*$/.test((form.getValues('githubLink') || '').trim())
    ) {
      form.setError('githubLink', {
        message: 'Invalid GitHub URL'
      });
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    const { githubLink, isPublic } = others!;
    githubLink && form.setValue('githubLink', githubLink);
    typeof isPublic === 'boolean' && form.setValue('isPublic', !!isPublic);
    if (githubLink && typeof isPublic === 'boolean') form.trigger();
  }, [others]);

  useEffect(() => {
    const exit = () => {
      exitConfirmRef.current?.open({
        onConfirm: async () => await submitRequest(form.getValues(), true),
        onConfirmCallback: () => redirectToUrl(`${MenuLink.HACKATHON_DASHBOARD}`)
      });
    };

    emitter.on('submit-form-exit', exit);
    return () => {
      emitter.off('submit-form-exit', exit);
    };
  }, []);

  const disable =
    typeof form.getValues('isPublic') !== 'boolean' ||
    (form.getValues('isPublic') === true && !(form.getValues('githubLink') || '').trim());

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
              className={cn('button-text-m w-[165px] px-0 py-4 uppercase', disable ? 'bg-neutral-light-gray' : '')}
              disabled={disable}
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

export default memo(OthersForm);
