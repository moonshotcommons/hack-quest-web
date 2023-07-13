import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import UserLogin from '@/components/Login';
import VerifyEmail from '@/components/Login/VerifyEmail';
import { cn } from '@/helper/utils';
import { useLoginValidator } from '@/hooks/useLoginValidator';
import { Radio } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

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
  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: ''
  });
  // const { validator } = useLoginValidator(formData);

  // useEffect(() => {});

  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <div className="w-full h-full flex justify-end items-center">
      {!showLogin ? (
        <VerifyEmail
          onStatusChange={(status) => setEmailCheckStatus(status)}
          onNext={(email: string) => {
            if (emailCheckStatus) {
              setShowLogin(true);
              setEmail(email);
            }
          }}
        ></VerifyEmail>
      ) : (
        <UserLogin email={email}></UserLogin>
      )}
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default RegisterPage;
