import { BurialPoint } from '@/helper/burialPoint';
import { useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import { useValidator } from '@/hooks/useValidator';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import VerifyEmail from '../VerifyEmail';
import ThreePartyLogin from '../ThreePartyLogin';
import webApi from '@/service';
import { AuthType } from '@/service/webApi/user/type';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = (props) => {
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { validator } = useValidator(['registerEmail']);
  const loginRouteType = useGetUserUnLoginType();

  const authInfo = useGetUserUnLoginType();

  useEffect(() => {
    if (
      authInfo &&
      authInfo.prevType === UnLoginType.INVITE_CODE &&
      authInfo.params?.email &&
      authInfo.params?.codeVerify
    ) {
      setEmail(authInfo.params?.email);
      setShowRegisterForm(true);
    }
  }, []);

  const EmailTitle = (
    <div className="text-[#FFF] text-[21px] leading-[160%] tracking-[1.26px]">
      Already have an account?{' '}
      <span
        className="underline cursor-pointer"
        onClick={() => {
          dispatch(setUnLoginType(UnLoginType.LOGIN));
        }}
      >
        Login
      </span>
    </div>
  );

  return (
    <div className="w-full flex flex-col">
      {!showRegisterForm ? (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VerifyEmail
            emailTitle={EmailTitle}
            validator={validator}
            onStatusChange={(status) => setEmailCheckStatus(status)}
            type={UnLoginType.SIGN_UP}
            onNext={(email: string) => {
              if (emailCheckStatus) {
                setEmail(email);
                webApi.userApi.checkEmailExists(email).then((res) => {
                  // if (res.inWhitelist) {
                  //   setShowRegisterForm(true);
                  // } else {
                  dispatch(
                    setUnLoginType({
                      type: UnLoginType.INVITE_CODE,
                      params: {
                        email,
                        registerType: AuthType.EMAIL
                      }
                    })
                  );
                  // }
                });
              }
            }}
          ></VerifyEmail>
          <ThreePartyLogin />
        </motion.div>
      ) : (
        <RegisterForm
          email={email}
          inviteCode={authInfo.params?.inviteCode}
          onBack={() => {
            BurialPoint.track('signup-注册返回');
            setShowRegisterForm(false);
          }}
        ></RegisterForm>
      )}
    </div>
  );
};

export default SignUp;
