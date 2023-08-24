import { FC, ReactNode, useState } from 'react';

import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { cn } from '@/helper/utils';
import { useValidator } from '@/hooks/useValidator';
import { Radio } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import webApi from '@/service';
import { useDebounce, useDebounceFn, useKeyPress } from 'ahooks';

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

interface VerifyEmailProps {
  onStatusChange: (status: boolean) => void;
  onNext: (email: string) => void;
  actionType: 'login' | 'register';
  value?: string;
}

const VerifyEmail: FC<VerifyEmailProps> = (props) => {
  const { onStatusChange, onNext, actionType, value } = props;

  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: value || ''
  });

  const [status, setStatus] = useState<any>('default');
  const [errorMessage, setErrorMessage] = useState('');

  const { validator } = useValidator([
    actionType === 'login' ? 'email' : 'registerEmail'
  ]);

  const { run: verifyEmail } = useDebounceFn(
    () => {
      validator.validate(formData, (errors, fields) => {
        if (errors?.[0]) {
          setStatus('error');
          setErrorMessage(errors?.[0].message || '');
        } else {
          setStatus('success');
          setErrorMessage('');
          onNext(formData.email);
        }
      });
    },
    { wait: 500 }
  );

  useKeyPress('enter', verifyEmail);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[2rem]">
        {actionType === 'register' && (
          <div>
            <div className="text-text-default-color text-[2rem] font-next-book leading-[125%] tracking-[.04rem]">
              <div>
                Welcome to <span>HACKQUEST</span>,
                <br /> Register to begin the Journey.
              </div>
            </div>
            <div className="text-text-default-color text-[1.125rem] font-next-book leading-[125%] tracking-[.0225rem] mt-8">
              Already have an account?{' '}
              <Link href={'/auth/login'} className="underline cursor-pointer">
                Login
              </Link>
            </div>
          </div>
        )}
        {actionType === 'login' && (
          <div>
            <p className="text-text-default-color text-[2rem] font-next-book leading-[125%] tracking-[.04rem]">
              Welcome to HACKQUEST
            </p>
            <p className="text-text-default-color text-[1.125rem] font-next-book leading-[125%] tracking-[.0225rem] mt-8">
              {`Don’t have an account? `}
              <Link
                href={'/auth/register'}
                className="underline cursor-pointer"
              >
                Create a account
              </Link>
              <br />
              It takes less than a minute.
            </p>
          </div>
        )}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          name="email"
          state={status}
          clear
          errorMessage={errorMessage}
          delay={500}
          onChange={(e) => {
            setStatus('default');
            setErrorMessage('');
            validator.validate({ email: e.target.value }, (errors, fields) => {
              if (errors?.[0]) {
                setStatus('error');
                setErrorMessage(errors?.[0].message || '');
                onStatusChange(false);
              } else {
                setStatus('success');
                setErrorMessage('');
                onStatusChange(true);
              }
            });
            setFormData({
              ...formData,
              email: e.target.value
            });
          }}
          defaultValue={formData.email}
        ></Input>
        <Button
          onClick={verifyEmail}
          block
          icon={<RightArrowIcon></RightArrowIcon>}
          iconPosition="right"
          className="bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color"
        >
          Next
        </Button>
        {/* <div className="flex gap-[0.5rem] justify-end text-[#ACACAC] font-Sofia-Pro-Light-Az font-light leading-[150%] tracking-[-0.011rem]">
          <span>Not a member yet? </span>
          <Link href={'/auth/register'}>
            <span className="text-[#F8F8F8] font-semibold">Register now</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default VerifyEmail;
