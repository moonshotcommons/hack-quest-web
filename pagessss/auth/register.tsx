import RegisterForm from '@/components/v1/Login/RegisterForm';
import VerifyEmail from '@/components/v1/Login/VerifyEmail';
import { NextPage } from 'next';
import { useState } from 'react';

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
    <div className="w-full max-w-[33.0625rem]  h-full flex justify-end items-center">
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
        <RegisterForm
          email={email}
          onBack={() => setRegisterForm(false)}
        ></RegisterForm>
      )}
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default RegisterPage;
