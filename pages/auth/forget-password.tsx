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

// const CustomButton: FC<ButtonProps> = (props) => {
//   const { children } = props;
//   return (
//     <Button
//       padding="px-[3rem] py-[1.25rem]"
//       fontStyle="Inter font-normal font-next-book"
//       textStyle="text-[.875rem] text-white leading-[1.25rem]"
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };

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
    <div className="h-full max-w-[33.0625rem] flex flex-col justify-center items-center">
      <div className="pt-[8rem] text-left">
        <div className="flex flex-col gap-8">
          <h1 className="text-text-default-color text-[1.75rem] font-Sofia-Pro-Light-Az font-semibold leading-[150%]">
            Forgot your password?
          </h1>
          <p className="text-auth-description-text-color font-next-book w-[31.8125rem] leading-[150%] -tracking-[0.011rem]">
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
            {/* <Button block onClick={sendEmail}>
              <div className="flex items-center gap-[1.25rem]">
                <span className="text-[1.25rem] font-next-book text-white leading-[118.5%] font-normal">
                  Send me link
                </span>
                <span>
                  <RightArrowIcon></RightArrowIcon>
                </span>
              </div>
            </Button>
            <Link href={'/login'}>
              <button className="py-[20px] w-full rounded-[2.52rem] border border-[#EDEDED] text-[1rem] font-Sofia-Pro-Light-Az text-white leading-[1.25rem]">
                Back
              </button>
            </Link> */}
            <Button
              onClick={sendEmail}
              block
              icon={<RightArrowIcon></RightArrowIcon>}
              iconPosition="right"
              className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
            >
              Send me link
            </Button>
            <Button
              onClick={() => router.back()}
              block
              className="
              font-next-book
              text-[1.125rem]
              border
              bg-auth-ghost-button-bg hover:bg-auth-ghost-button-hover-bg
              text-auth-ghost-button-text-color hover:text-auth-ghost-button-text-hover-color
              border-auth-ghost-button-border-color hover:border-auth-ghost-button-border-hover-color
              "
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
