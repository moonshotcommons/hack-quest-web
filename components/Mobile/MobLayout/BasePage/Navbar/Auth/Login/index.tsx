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
    <div>
      <p className="body-l-bold text-neutral-rich-gray text-base">
        {`Don’t have an account?  `}
        <span
          className="underline cursor-pointer"
          onClick={() => {
            setAuthType(AuthType.SIGN_UP);
          }}
        >
          Sign up
        </span>
      </p>
    </div>
  );

  return (
    <div className="w-full flex flex-col flex-1">
      {!showLogin && (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col justify-between h-full"
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
          className="w-full flex flex-col justify-between h-full"
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
