import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/public/images/logo/text-Logo.svg';
import Input from '@/components/Common/Input';
import { FC, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { useValidator } from '@/hooks/useValidator';
import Button, { ButtonProps } from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import webApi from '@/service';
import { useRouter } from 'next/router';
import { ForgetPasswordErrorStatusType } from '@/service/webApi/user/type';
import Link from 'next/link';
interface ForgetPasswordProps {
  children: React.ReactNode;
}

const CustomButton: FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <Button
      padding="px-[3rem] py-[1.25rem]"
      fontStyle="Inter font-normal font-next-book"
      textStyle="text-[.875rem] text-white leading-[1.25rem]"
      {...props}
    >
      {children}
    </Button>
  );
};

const ForgetPassword: NextPage<ForgetPasswordProps> = (props) => {
  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: ''
  });

  const [status, setStatus] = useState<any>('default');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { validator } = useValidator(['email']);

  const { run: sendEmail } = useDebounceFn(
    () => {
      validator.validate(formData, async (errors, fields) => {
        if (errors?.[0]) {
          setStatus('error');
          setErrorMessage(errors?.[0].message || '');
        } else {
          try {
            setStatus('success');
            setErrorMessage('');
            const res = await webApi.userApi.forgetPassword(formData.email);
            router.push('/auth/email-verify');
          } catch (e: any) {
            setStatus('error');
            setErrorMessage(e.msg || '');
          }
        }
      });
    },
    { wait: 500 }
  );

  return (
    <div className="w-full h-full min-h-screen flex justify-end items-center">
      <div className="py-[19.78rem] px-[7.5rem] text-left">
        <div className="flex flex-col gap-8">
          <h1 className="text-[#F8F8F8] text-[1.75rem] font-Sofia-Pro-Light-Az font-semibold leading-[150%]">
            Forgot your password?
          </h1>
          <p className="text-[#676767] font-next-book w-[31.8125rem] leading-[150%] -tracking-[0.011rem]">
            We will send you a link to reset your password.{' '}
          </p>
        </div>
        <div className="mt-[2rem] flex flex-col">
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            name="email"
            state={status}
            errorMessage={errorMessage}
            className="border-none bg-[#111]"
            delay={500}
            onChange={(e) => {
              validator.validate(
                { email: e.target.value },
                (errors, fields) => {
                  if (errors?.[0]) {
                    setStatus('error');
                    setErrorMessage(errors?.[0].message || '');
                    // onStatusChange(false);
                  } else {
                    setStatus('success');
                    setErrorMessage('');
                    // onStatusChange(true);
                  }
                }
              );
              setFormData({
                ...formData,
                email: e.target.value
              });
            }}
          ></Input>
          <div className="mt-[2rem] flex flex-col gap-[0.75rem]">
            <CustomButton block onClick={sendEmail}>
              <div className="flex items-center gap-[1.25rem]">
                <span className="text-[1.25rem] font-next-book text-white leading-[118.5%] font-normal">
                  Send me link
                </span>
                <span>
                  <RightArrowIcon></RightArrowIcon>
                </span>
              </div>
            </CustomButton>
            <Link href={'/login'}>
              <Button className="py-[1.25rem] w-full border border-[#EDEDED] bg-transparent">
                <div className="flex items-center gap-[1.25rem]">
                  <span className="text-[1rem] font-Sofia-Pro-Light-Az text-white leading-[1.25rem]">
                    Back
                  </span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
