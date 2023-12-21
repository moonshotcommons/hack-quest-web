import UserLogin from '@/components/v1/Login';
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

const LoginPage: NextPage<any> = () => {
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <div className="w-full max-w-[33.0625rem]  h-full flex justify-end items-center">
      {!showLogin ? (
        <VerifyEmail
          value={email}
          actionType="login"
          onStatusChange={(status) => setEmailCheckStatus(status)}
          onNext={(email: string) => {
            if (emailCheckStatus) {
              setShowLogin(true);
              setEmail(email);
            }
          }}
        ></VerifyEmail>
      ) : (
        <UserLogin email={email} onBack={() => setShowLogin(false)}></UserLogin>
      )}
    </div>
  );
};

LoginPage.displayName = 'LoginPage';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default LoginPage;
