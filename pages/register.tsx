import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import RegisterForm from '@/components/Login/RegisterForm';
import { NextPage } from 'next';
import { FC, useState } from 'react';

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

const RegisterPage: NextPage<any> = () => {
  return (
    <div className="relative">
      <div className="w-full flex justify-end">
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default RegisterPage;
