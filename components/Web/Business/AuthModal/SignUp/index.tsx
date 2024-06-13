import { BurialPoint } from '@/helper/burialPoint';
import { useValidator } from '@/hooks/auth/useValidator';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import RegisterForm from '../RegisterForm';
import VerifyEmail from '../VerifyEmail';
import ThreePartyLogin from '../ThreePartyLogin';
import webApi from '@/service';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { ThirdPartyAuthType } from '@/service/webApi/user/type';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = (props) => {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EmailTitle = (
    <p className="body-l-bold text-neutral-rich-gray">
      {t('already_have_account')}
      <span
        className="cursor-pointer underline"
        onClick={() => {
          setAuthType(AuthType.LOGIN);
        }}
      >
        {t('login')}
      </span>
    </p>
  );

  return (
    <div className="flex w-full flex-1 flex-col">
      {!showRegisterForm && (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-full w-full flex-col justify-between"
        >
          <>
            <VerifyEmail
              emailTitle={EmailTitle}
              validator={validator}
              type={AuthType.SIGN_UP}
              onNext={(email) => {
                setEmail(email);
                // setInviteCode(inviteCode!);
                webApi.userApi.checkEmailExists(email).then((res) => {
                  // if (res.inWhitelist) {
                  // setShowRegisterForm(true);
                  // } else {
                  setAuthType({
                    type: AuthType.INVITE_CODE,
                    params: {
                      email,
                      registerType: ThirdPartyAuthType.EMAIL
                    }
                  });
                  // }
                });
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
          className="flex h-full w-full flex-col justify-between"
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
