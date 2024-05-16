'use client';
import { FC, useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormComponentProps } from '..';
import Button from '@/components/Common/Button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import { HackathonRegisterStateType } from '../../../type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import { message } from 'antd';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import EnrolledSingaporeRadio from './EnrolledSingaporeRadio';

const formSchema = z.object({
  selfIntroduction: z
    .string()
    .min(1, {
      message: 'Bio is a required input.'
    })
    .max(360, {
      message: 'Bio cannot exceed 360 characters.'
    }),
  isEnrolledSingapore: z.boolean()
});

export type BioFormSchema = z.infer<typeof formSchema>;

// additionalInfo: {
//   selfIntroduction: string;
//   isEnrolledSingapore: boolean;
// };

const BioForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> &
    Pick<HackathonRegisterStateType, 'additionalInfo' | 'status' | 'isRegister'>
> = ({ onNext, onBack, additionalInfo, status, isRegister }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selfIntroduction: additionalInfo.selfIntroduction,
      isEnrolledSingapore: undefined
    }
  });

  const { redirectToUrl } = useRedirect();
  const confirmModalRef = useRef<ConfirmModalRef>(null);
  const { runAsync: register } = useRequest(
    () => {
      return webApi.courseApi.registerNtu();
    },
    {
      manual: true,
      onSuccess() {
        !isRegister && message.success(`Register success!`);
        isRegister && message.success(`Update register info success!`);
        redirectToUrl(`${MenuLink.NTU_COURSE}?isRegister=true`);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { runAsync: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      // const newStatus =
      //   HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 2
      //     ? HackathonRegisterStep.SubmissionType
      //     : status;
      const res = await webApi.courseApi.updateNtuRegisterInfo({
        selfIntroduction: values.selfIntroduction,
        isEnrolledSingapore: values.isEnrolledSingapore
      });
      return { res, values };
    },
    {
      manual: true,
      onSuccess({ res, values }) {
        onNext({ additionalInfo: values });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setContractInfo();
    const isSame = values.selfIntroduction === additionalInfo.selfIntroduction;
    if (isSame && isRegister) {
      onNext({
        additionalInfo: { selfIntroduction: values.selfIntroduction, isEnrolledSingapore: values.isEnrolledSingapore }
      });
      return;
    }
    await submitRequest(values);
    confirmModalRef.current?.open({
      onConfirm: register
    });
  }

  useEffect(() => {
    const { selfIntroduction, isEnrolledSingapore } = additionalInfo;

    // form.setValue('selfIntroduction', additionalInfo.selfIntroduction);
    // typeof isEnrolledSingapore === 'boolean' && form.setValue('isEnrolledSingapore', !!isEnrolledSingapore);
    if (selfIntroduction && typeof isEnrolledSingapore === 'boolean') form.trigger();
  }, [additionalInfo]);

  const disable =
    typeof form.getValues('isEnrolledSingapore') !== 'boolean' || !(form.getValues('selfIntroduction') || '').trim();

  return (
    <div className="h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full w-full flex-col gap-6">
          <div className="flex h-full flex-col gap-4 text-left">
            <EnrolledSingaporeRadio form={form} />
            <FormField
              control={form.control}
              name={'selfIntroduction'}
              render={({ field }) => (
                <FormItem className="flex w-full flex-1 flex-col pb-[80px] text-left">
                  <div className="flex w-full justify-between">
                    <FormLabel className="body-s text-[14px] font-normal leading-[160%] text-neutral-rich-gray">
                      {'Please introduce yourself to the guest lecturers and future classmates'}
                    </FormLabel>
                    <span className="caption-12pt text-neutral-rich-gray">
                      <span className={form.watch('selfIntroduction').length > 360 ? 'text-status-error' : ''}>
                        {form.watch('selfIntroduction').length}
                      </span>
                      /360
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      authHeight={false}
                      placeholder={'Say hi to everyone!'}
                      {...field}
                      className="body-s flex-1 border-neutral-light-gray px-6 py-3 text-[16px] font-normal leading-[160%] text-neutral-medium-gray"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="fixed bottom-10 flex w-full gap-4">
            <Button
              htmlType="button"
              ghost
              className="button-text-m  w-[calc((100%-16px-40px)/2)] px-0 py-4 uppercase"
              onClick={onBack}
            >
              Back
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className={cn(
                'button-text-m  w-[calc((100%-16px-40px)/2)] px-0 py-4 uppercase',
                !form.formState.isValid ? 'bg-neutral-light-gray' : ''
              )}
              disabled={disable}
              loading={loading}
            >
              {isRegister ? 'update' : 'Save'} And Register
            </Button>
          </div>
        </form>
      </Form>
      <ConfirmModal ref={confirmModalRef} className="w-full">
        <h4 className="text-h4 mb-9 text-center text-neutral-black">
          Do you want to {isRegister ? 'update' : 'register'} in this course?
        </h4>
      </ConfirmModal>
    </div>
  );
};

export default BioForm;
