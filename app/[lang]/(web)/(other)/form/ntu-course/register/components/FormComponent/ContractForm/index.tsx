'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormLabel } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useEffect, useState } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { HackathonRegisterStateType } from '../../../type';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { errorMessage } from '@/helper/ui';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { HackathonRegisterStep } from '@/service/webApi/resourceStation/type';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { isEqual } from 'lodash-es';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z
  .object({
    email: z.string().email(),
    weChat: z.string().optional(),
    telegram: z.string().optional()
  })
  .refine((data) => data.weChat !== '' || data.telegram !== '', {
    message: 'At least one input must be filled',
    path: ['weChat', 'telegram']
  });

const TYPES = ['WeChat', 'Telegram'];

const ContractForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> &
    Pick<HackathonRegisterStateType, 'contractInfo' | 'status' | 'isRegister'>
> = ({ onNext, onBack, contractInfo, status, isRegister }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: contractInfo
  });

  const [types, setTypes] = useState(TYPES);

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 1
          ? HackathonRegisterStep.Bio
          : status;
      const res = await webApi.resourceStationApi.updateHackathonRegisterInfo('', {
        email: values.email,
        weChat: values.weChat,
        telegram: values.telegram,
        status: newStatus
      });
      return { res, values, status: newStatus };
    },
    {
      manual: true,
      onSuccess({ res, values, status }) {
        onNext({ contractInfo: { weChat: values.weChat, telegram: values.telegram, email: values.email }, status });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setContractInfo();

    if (isEqual(values, contractInfo)) {
      onNext({ contractInfo: values });
      return;
    }
    submitRequest(values);
  }

  useEffect(() => {
    form.setValue('weChat', contractInfo.weChat);
    form.setValue('telegram', contractInfo.telegram);
    if (contractInfo.weChat && contractInfo.telegram) form.trigger();
  }, [contractInfo]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-left">
            <p className="body-l text-neutral-off-black">Please provide at least one contact information</p>
            <div>
              <p className="body-l mb-1 text-neutral-off-black">Contact Info 1*</p>
              <CustomFormField
                form={form}
                placeholder="Enter your Email address"
                label="Email*"
                name={'email'}
                onBlur={() => {
                  if (!!form.getValues('email')?.trim()) form.trigger('email');
                }}
              />
            </div>
            <div className="my-1 h-px w-full scale-y-50 bg-neutral-light-gray"></div>
            <div>
              <p className="body-l mb-1 text-neutral-off-black">Contact Info 2*</p>
              <div className="flex justify-between gap-4">
                <div className="flex w-[146px] flex-col gap-1">
                  <FormLabel className="body-m inline-block w-full text-left text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    Type
                  </FormLabel>
                  <Select
                    onValueChange={(v) => {
                      setTypes(TYPES.filter((t) => t !== v));
                    }}
                    defaultValue={''}
                  >
                    <SelectTrigger className="!body-m h-[50px] w-full px-3 !text-[16px] leading-[160%]">
                      <SelectValue placeholder={'Please select'} />
                    </SelectTrigger>
                    <SelectContent className="">
                      {TYPES.map((item) => {
                        return (
                          <SelectItem
                            key={item}
                            className="body-m text-[16px] leading-[160%]"
                            value={item}
                            disabled={!types.includes(item)}
                          >
                            {item}
                          </SelectItem>
                        );
                      })}
                      {/* <SelectItem className="body-m text-[16px] leading-[160%]" value={'WeChat'}>
                        WeChat
                      </SelectItem>
                      <SelectItem className="body-m text-[16px] leading-[160%]" value={'Telegram'}>
                        Telegram
                      </SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <CustomFormField form={form} placeholder="Enter your WeChat account" label="WeChat" name={'weChat'} />
                </div>
              </div>
            </div>
            <div>
              <p className="body-l mb-1 text-neutral-off-black">Contact Info 3*</p>
              <div className="flex justify-between gap-4">
                <div className="flex w-[146px] flex-col gap-1">
                  <FormLabel className="body-m inline-block w-full text-left text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    Type
                  </FormLabel>
                  <Select
                    onValueChange={(v) => {
                      setTypes(TYPES.filter((t) => t !== v));
                    }}
                    defaultValue={''}
                  >
                    <SelectTrigger className="!body-m h-[50px] w-full px-3 !text-[16px] leading-[160%]">
                      <SelectValue placeholder={'Please select'} />
                    </SelectTrigger>
                    <SelectContent className="">
                      {TYPES.map((item) => {
                        return (
                          <SelectItem
                            key={item}
                            className="body-m text-[16px] leading-[160%]"
                            value={item}
                            disabled={!types.includes(item)}
                          >
                            {item}
                          </SelectItem>
                        );
                      })}
                      {/* <SelectItem className="body-m text-[16px] leading-[160%]" value={'WeChat'}>
                        WeChat
                      </SelectItem>
                      <SelectItem className="body-m text-[16px] leading-[160%]" value={'Telegram'}>
                        Telegram
                      </SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <CustomFormField form={form} placeholder="Enter your WeChat account" label="WeChat" name={'weChat'} />
                </div>
              </div>
            </div>
            {/* <CustomFormField form={form} placeholder="Enter your Telegram account" label="Telegram" name="telegram" /> */}
          </div>
          <div className="flex justify-end gap-4">
            <Button htmlType="button" ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack}>
              Back
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className={cn(
                'button-text-m min-w-[165px] px-0 py-4 uppercase',
                !form.formState.isValid ? 'bg-neutral-light-gray' : ''
              )}
              disabled={!form.formState.isValid}
              loading={loading}
            >
              {isRegister ? 'update' : 'Save'} And Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default memo(ContractForm);
