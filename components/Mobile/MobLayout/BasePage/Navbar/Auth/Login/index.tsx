import { BurialPoint } from '@/helper/burialPoint';
import { useValidator } from '@/hooks/useValidator';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import UserLogin from '../UserLogin';
import VerifyEmail from '../VerifyEmail';
import ThreePartyLogin from '../ThreePartyLogin';
import { AuthType, useUserStore } from '@/store/zustand/userStore';

interface LoginProps {}

const Login: FC<LoginProps> = (props) => {
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const { validator } = useValidator(['email']);
  const setAuthType = useUserStore((state) => state.setAuthType);

  const EmailTitle = (
    <p className="text-center font-GT-Walsheim-Trial text-[1rem] leading-[140%] text-[#C4C4C4]">
      {`Don’t have an account?  `}
      <span
        className="cursor-pointer underline"
        onClick={() => {
          setAuthType(AuthType.SIGN_UP);
        }}
      >
        Sign up
      </span>
    </p>
  );

  return (
    <div className="flex w-full flex-1 flex-col">
      {!showLogin && (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-full w-full flex-col justify-between"
        >
          <>
            <VerifyEmail
              validator={validator}
              emailTitle={EmailTitle}
              value={email}
              type={AuthType.LOGIN}
              onStatusChange={(status) => setEmailCheckStatus(status)}
              onNext={(email: string) => {
                if (emailCheckStatus) {
                  setShowLogin(true);
                  setEmail(email);
                }
              }}
            ></VerifyEmail>
            <ThreePartyLogin />
          </>
        </motion.div>
      )}

      {showLogin && (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-full w-full flex-col justify-between"
        >
          <UserLogin
            email={email}
            onBack={() => {
              BurialPoint.track('login-登录返回');
              setShowLogin(false);
            }}
          ></UserLogin>
        </motion.div>
      )}
    </div>
  );
};

export default Login;
