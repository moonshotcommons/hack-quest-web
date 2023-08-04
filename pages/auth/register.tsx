import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import RegisterForm from '@/components/Login/RegisterForm';
import VerifyEmail from '@/components/Login/VerifyEmail';
import { NextPage } from 'next';
import { FC, useState } from 'react';

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

const RegisterPage: NextPage<any> = () => {
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showRegisterForm, setRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <div className="relative">
      <div className="w-full flex justify-end">
        {!showRegisterForm ? (
          <VerifyEmail
            actionType="register"
            onStatusChange={(status) => setEmailCheckStatus(status)}
            onNext={(email: string) => {
              if (emailCheckStatus) {
                setRegisterForm(true);
                setEmail(email);
              }
            }}
          ></VerifyEmail>
        ) : (
          <RegisterForm email={email}></RegisterForm>
        )}
      </div>
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default RegisterPage;
