import { BurialPoint } from '@/helper/burialPoint';
import { useValidator } from '@/hooks/auth/useValidator';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import UserLogin from '../UserLogin';
import VerifyEmail from '../VerifyEmail';
import ThreePartyLogin from '../ThreePartyLogin';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface LoginProps {}

const Login: FC<LoginProps> = (props) => {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const { validator } = useValidator(['email']);
  const setAuthType = useUserStore((state) => state.setAuthType);

  const EmailTitle = (
    <div>
      <p className="body-l-bold text-neutral-rich-gray">
        {t('no_account')}
        <span
          className="ml-1 cursor-pointer underline"
          onClick={() => {
            setAuthType(AuthType.SIGN_UP);
          }}
        >
          {t('sign_up')}
        </span>
      </p>
    </div>
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
              onNext={(email: string) => {
                setShowLogin(true);
                setEmail(email);
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
