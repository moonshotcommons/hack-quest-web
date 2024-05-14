'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, memo, useEffect, useState } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { HackathonRegisterStateType } from '../../../type';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { errorMessage } from '@/helper/ui';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { isEqual } from 'lodash-es';
import { NtuRegisterStep } from '@/service/webApi/course/type';

const formSchema = z.object({
  email: z.string().email(),
  weChat: z.string().optional(),
  telegram: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  whatsApp: z.string().optional(),
  linkedIn: z.string().optional()
});
// .refine((data) => data.weChat !== '' || data.telegram !== '', {
//   message: 'At least one input must be filled',
//   path: ['weChat', 'telegram']
// });

const TYPES = [
  {
    type: 'WeChat',
    name: 'weChat',
    placeholder: 'Enter your WeChat account'
  },
  {
    type: 'Telegram',
    name: 'telegram',
    placeholder: 'Enter your Telegram account'
  }
];

const ContractForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> &
    Pick<HackathonRegisterStateType, 'contractInfo' | 'status' | 'isRegister'>
> = ({ onNext, onBack, contractInfo, status, isRegister }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: contractInfo
  });

  const [types, setTypes] = useState<({ type: string; placeholder: string; name: string } | undefined)[]>([]);
  const [showMoreContractInfo, setShowMoreContractInfo] = useState(false);

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 1
          ? NtuRegisterStep.ADDITIONAL_INFO
          : status;
      const res = await webApi.courseApi.updateNtuRegisterInfo({
        email: values.email,
        weChat: values.weChat,
        telegram: values.telegram,
        twitter: values.twitter,
        discord: values.discord,
        whatsApp: values.whatsApp,
        linkedIn: values.linkedIn,
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
    const newTypes: any = [];
    if (contractInfo.weChat) {
      newTypes.push(TYPES[0]);
      setTimeout(() => {
        form.setValue('weChat', contractInfo.weChat);
      }, 100);
    }
    if (contractInfo.telegram) {
      newTypes.push(TYPES[1]);
      setTimeout(() => {
        form.setValue('telegram', contractInfo.telegram);
      }, 100);
    }
    console.log(newTypes, contractInfo);
    setTypes(newTypes);
    if (contractInfo.weChat || contractInfo.telegram) form.trigger();
  }, [contractInfo]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-left">
            <p className="body-l text-neutral-off-black">Please provide at least one contact information</p>
            <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-4">
              <p className="body-l">{`By filling in some additional contact information like Telegram and Discord, you'll be invited to join
                our vibrant MOOC discussion groups on social media platforms. This is a great way to connect with fellow
                learners and get the most out of the course series!`}</p>
              <CustomFormField
                form={form}
                placeholder="Please enter your WeChat ID"
                label="WeChat (optional)"
                name={'weChat'}
              />
              <CustomFormField
                form={form}
                placeholder="Please enter your Telegram ID"
                label="Telegram (optional)"
                name="telegram"
              />
              <CustomFormField
                form={form}
                placeholder="Please enter your Discord ID"
                label="Discord (optional)"
                name="discord"
              />
              <CustomFormField
                form={form}
                placeholder="Please enter your WhatsApp Number"
                label="WhatsApp (optional)"
                name="whatsApp"
              />
              <CustomFormField
                form={form}
                placeholder="Please enter your Twitter URL"
                label="Twitter (optional)"
                name="twitter"
              />
              <CustomFormField
                form={form}
                placeholder="Please enter your LinkedIn URL"
                label="LinkedIn (optional)"
                name="linkedIn"
              />
            </div>
            {/* <div className="my-1 h-px w-full scale-y-50 bg-neutral-light-gray"></div>
            <div>
              <p className="body-l mb-1 text-neutral-off-black">Contact Info 2*</p>
              <div className="flex justify-between gap-4">
                <div className="flex w-[146px] flex-col gap-1">
                  <FormLabel className="body-m inline-block w-full text-left text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    Type
                  </FormLabel>
                  <Select
                    onValueChange={(v) => {
                      types[0] = TYPES.find((t) => t.type === v)!;
                      setTypes([...types]);
                    }}
                    defaultValue={types[0]?.type || ''}
                  >
                    <SelectTrigger className="!body-m h-[50px] w-full px-3 !text-[16px] leading-[160%]">
                      <SelectValue placeholder={types[0]?.type || 'Please select'} />
                    </SelectTrigger>
                    <SelectContent className="">
                      {TYPES.map((item) => {
                        return (
                          <SelectItem
                            key={item.type}
                            className="body-m text-[16px] leading-[160%]"
                            value={item.type}
                            disabled={!!types.find((t) => t?.type === item.type)}
                          >
                            {item.type}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <CustomFormField
                    form={form}
                    placeholder="Enter your account info"
                    label={types[0]?.type || 'Account'}
                    name={(types[0]?.name as any) || ''}
                  />
                </div>
              </div>
            </div>
            <div className="my-1 h-px w-full scale-y-50 bg-neutral-light-gray"></div>
            {!showMoreContractInfo && (
              <>
                <Button
                  block
                  htmlType="button"
                  className="px-0 py-0 hover:scale-[1.02] [&>span]:flex [&>span]:w-full"
                  onClick={() => setShowMoreContractInfo(true)}
                >
                  <span className="flex w-full items-center justify-center gap-2 rounded-[16px] border border-dashed border-neutral-light-gray p-5 text-neutral-medium-gray">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 12.5C2 6.97715 6.47715 2.5 12 2.5C14.6522 2.5 17.1957 3.55357 19.0711 5.42893C20.9464 7.3043 22 9.84784 22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5ZM13 13.5H17C17.5523 13.5 18 13.0523 18 12.5C18 11.9477 17.5523 11.5 17 11.5H13V7.5C13 6.94772 12.5523 6.5 12 6.5C11.4477 6.5 11 6.94772 11 7.5V11.5H7C6.44772 11.5 6 11.9477 6 12.5C6 13.0523 6.44772 13.5 7 13.5H11V17.5C11 18.0523 11.4477 18.5 12 18.5C12.5523 18.5 13 18.0523 13 17.5V13.5Z"
                        fill="#8C8C8C"
                      />
                    </svg>
                    <span>Add more contact info</span>
                  </span>
                </Button>
              </>
            )}
            {showMoreContractInfo && (
              <div>
                <p className="body-l mb-1 flex items-center justify-between text-neutral-off-black">
                  <span>Contact Info 3*</span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                    onClick={() => {
                      setShowMoreContractInfo(false);
                      setTypes(types.filter((t) => t?.type !== types[1]?.type));
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 2.5H5C3.34315 2.5 2 3.84315 2 5.5V7.5C2 8.05228 2.44772 8.5 3 8.5H4V19.5C4 21.1569 5.34315 22.5 7 22.5H17C18.6569 22.5 20 21.1569 20 19.5V8.5H21C21.5523 8.5 22 8.05228 22 7.5V5.5C22 3.84315 20.6569 2.5 19 2.5ZM18 19.5C18 20.0523 17.5523 20.5 17 20.5H7C6.44772 20.5 6 20.0523 6 19.5V8.5H18V19.5ZM4 6.5H20V5.5C20 4.94772 19.5523 4.5 19 4.5H5C4.44772 4.5 4 4.94772 4 5.5V6.5ZM8 17.5V11.5C8 10.9477 8.44772 10.5 9 10.5C9.55228 10.5 10 10.9477 10 11.5V17.5C10 18.0523 9.55228 18.5 9 18.5C8.44772 18.5 8 18.0523 8 17.5ZM14 11.5V17.5C14 18.0523 14.4477 18.5 15 18.5C15.5523 18.5 16 18.0523 16 17.5V11.5C16 10.9477 15.5523 10.5 15 10.5C14.4477 10.5 14 10.9477 14 11.5Z"
                      fill="#3E3E3E"
                    />
                  </svg>
                </p>
                <div className="flex justify-between gap-4">
                  <div className="flex w-[146px] flex-col gap-1">
                    <FormLabel className="body-m inline-block w-full text-left text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                      Type
                    </FormLabel>
                    <Select
                      onValueChange={(v) => {
                        types[1] = TYPES.find((t) => t.type === v)!;
                        setTypes([...types]);
                      }}
                      defaultValue={types[1]?.type || ''}
                    >
                      <SelectTrigger className="!body-m h-[50px] w-full px-3 !text-[16px] leading-[160%]">
                        <SelectValue placeholder={types[1]?.type || 'Please select'} />
                      </SelectTrigger>
                      <SelectContent className="">
                        {TYPES.map((item) => {
                          return (
                            <SelectItem
                              key={item.type}
                              className="body-m text-[16px] leading-[160%]"
                              value={item.type}
                              disabled={!!types.find((t) => t?.type === item.type)}
                            >
                              {item.type}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <CustomFormField
                      form={form}
                      placeholder="Enter your account info"
                      label={types[1]?.type || 'Account'}
                      name={(types[1]?.name as any) || ''}
                    />
                  </div>
                </div>
              </div>
            )} */}
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
