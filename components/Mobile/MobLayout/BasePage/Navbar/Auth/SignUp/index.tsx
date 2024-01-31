import { BurialPoint } from '@/helper/burialPoint';
import { useValidator } from '@/hooks/useValidator';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import RegisterForm from '../RegisterForm';
import VerifyEmail from '../VerifyEmail';
import ThreePartyLogin from '../ThreePartyLogin';
import webApi from '@/service';
import { AuthType, useUserStore } from '@/store/zustand/userStore';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = (props) => {
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const { validator } = useValidator(['registerEmail']);
  const authRouteType = useUserStore((state) => state.authRouteType);
  const setAuthType = useUserStore((state) => state.setAuthType);

  useEffect(() => {
    if (
      authRouteType &&
      authRouteType.prevType === AuthType.INVITE_CODE &&
      authRouteType.params?.email &&
      authRouteType.params?.codeVerify
    ) {
      setEmail(authRouteType.params?.email);
      setShowRegisterForm(true);
    }
  }, []);

  const EmailTitle = (
    <p className="body-l-bold text-neutral-rich-gray text-base">
      Already have an account?{' '}
      <span
        className="underline cursor-pointer"
        onClick={() => {
          setAuthType(AuthType.LOGIN);
        }}
      >
        Log in
      </span>
    </p>
  );

  return (
    <div className="w-full flex flex-col flex-1">
      {!showRegisterForm && (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col justify-between h-full"
        >
          <>
            <VerifyEmail
              emailTitle={EmailTitle}
              validator={validator}
              onStatusChange={(status) => setEmailCheckStatus(status)}
              type={AuthType.SIGN_UP}
              onNext={(email: string) => {
                if (emailCheckStatus) {
                  setEmail(email);
                  webApi.userApi.checkEmailExists(email).then((res) => {
                    // if (res.inWhitelist) {
                    setShowRegisterForm(true);
                    // } else {
                    // setAuthType({
                    //   type: AuthType.INVITE_CODE,
                    //   params: {
                    //     email,
                    //     registerType: ThirdPartyAuthType.EMAIL
                    //   }
                    // });
                    // }
                  });
                }
              }}
            ></VerifyEmail>
            <ThreePartyLogin />
          </>
        </motion.div>
      )}

      {showRegisterForm && (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col justify-between h-full"
        >
          <RegisterForm
            email={email}
            inviteCode={authRouteType.params?.inviteCode}
            onBack={() => {
              BurialPoint.track('signup-注册返回');
              setShowRegisterForm(false);
            }}
          ></RegisterForm>
        </motion.div>
      )}
    </div>
  );
};

export default SignUp;