import { FC, ReactNode, useState } from 'react';

import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { cn } from '@/helper/utils';
import { useLoginValidator } from '@/hooks/useLoginValidator';
import { Radio } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';

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

interface UserLoginProps {
  // children: ReactNode;
}

const UserLogin: FC<UserLoginProps> = (props) => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: ''
  });
  const { validator } = useLoginValidator(formData);
  return (
    <div className="px-[6.875rem] py-[11.3125rem] h-full flex flex-col justify-center items-center">
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
          // state={formData.email.state}
          // errorMessage={formData.email.error}
          delay={500}
          rules={{
            type: 'string',
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'illegal email'
          }}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value
            });
          }}
        ></Input>
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          // state={formData.password.state}
          // errorMessage={formData.password.error}
          delay={500}
          rules={{
            type: 'string',
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
            message: 'illegal password'
          }}
          onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value
            });
          }}
        ></Input>
        <div className="flex gap-[.75rem]">
          <Checkbox></Checkbox>
          <p className="text-[#676767] text-[1rem] font-Sofia-Pro-Light-Az tracking-[-0.011rem]">
            Keep me logged in
          </p>
        </div>
        <CustomButton
          onClick={() => {
            validator.validate(formData, (errors, fields) => {
              console.log(errors, fields);
            });
          }}
          block
        >
          <div className="flex items-center gap-[1.25rem]">
            <span className="text-[1.25rem] font-next-book text-white leading-[118.5%]">
              Next
            </span>
            <span>
              <RightArrowIcon></RightArrowIcon>
            </span>
          </div>
        </CustomButton>

        <Link href={'/'} className="w-full text-right">
          <span className="text-[#676767] font-Sofia-Pro-Light-Az text-[1rem] leading-[150%] tracking-[-0.011rem] text-right">
            Forgot your password？
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
