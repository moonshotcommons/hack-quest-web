import { BurialPoint } from '@/helper/burialPoint';
import { useValidator } from '@/hooks/useValidator';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserLogin from '../UserLogin';
import VerifyEmail from '../VerifyEmail';

interface LoginProps {}

const Login: FC<LoginProps> = (props) => {
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const { validator } = useValidator(['email']);
  const dispatch = useDispatch();

  const EmailTitle = (
    <div>
      <p className="text-[#FFF] text-[21px] font-next-poster leading-[160%] tracking-[1.26px]">
        {`Don’t have an account? `}
        <span
          className="underline cursor-pointer"
          onClick={() => {
            dispatch(setUnLoginType(UnLoginType.SIGN_UP));
          }}
        >
          Create an account
        </span>
        <br />
        It takes less than a minute.
      </p>
    </div>
  );

  return (
    <div className="w-full  h-full flex flex-col items-center">
      {!showLogin ? (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VerifyEmail
            validator={validator}
            emailTitle={EmailTitle}
            value={email}
            type={UnLoginType.LOGIN}
            onStatusChange={(status) => setEmailCheckStatus(status)}
            onNext={(email: string) => {
              if (emailCheckStatus) {
                setShowLogin(true);
                setEmail(email);
              }
            }}
          ></VerifyEmail>
        </motion.div>
      ) : (
        <motion.div
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
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
