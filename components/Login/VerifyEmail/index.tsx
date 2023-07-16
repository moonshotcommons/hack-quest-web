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
import { useDebounce, useDebounceFn } from 'ahooks';

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

interface VerifyEmailProps {
  onStatusChange: (status: boolean) => void;
  onNext: (email: string) => void;
}

const VerifyEmail: FC<VerifyEmailProps> = (props) => {
  const { onStatusChange, onNext } = props;

  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: ''
  });

  const [status, setStatus] = useState<any>('default');
  const [errorMessage, setErrorMessage] = useState('');

  const { validator } = useValidator(['email']);

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

  return (
    <div className="px-[6.875rem] py-[17.0625rem] h-full flex flex-col justify-center items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex flex-col gap-[2rem]">
        <p className="text-[#F8F8F8] text-[1.75rem] font-Sofia-Pro-Light-Az font-semibold leading-[150%]">
          Log in
        </p>

        <Input
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          state={status}
          errorMessage={errorMessage}
          delay={500}
          onChange={(e) => {
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
        ></Input>
        <CustomButton onClick={verifyEmail} block>
          <div className="flex items-center gap-[1.25rem]">
            <span className="text-[1.25rem] font-next-book text-white leading-[118.5%]">
              Next
            </span>
            <span>
              <RightArrowIcon></RightArrowIcon>
            </span>
          </div>
        </CustomButton>
        <div className="flex gap-[0.5rem] justify-end text-[#ACACAC] font-Sofia-Pro-Light-Az font-light leading-[150%] tracking-[-0.011rem]">
          <span>Not a member yet? </span>
          <Link href={'/auth/register'}>
            <span className="text-[#F8F8F8] font-semibold">Register now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
