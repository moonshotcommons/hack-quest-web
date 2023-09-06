import { useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import { useValidator } from '@/hooks/useValidator';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import VerifyEmail from '../VerifyEmail';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = (props) => {
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showRegisterForm, setRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { validator } = useValidator(['registerEmail']);
  const loginRouteType = useGetUserUnLoginType();

  const EmailTitle = (
    <div className="text-[#FFF] text-[21px] font-next-poster leading-[160%] tracking-[1.26px]">
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
    <div className="w-full h-full flex flex-col">
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
            onNext={(email: string) => {
              if (emailCheckStatus) {
                setRegisterForm(true);
                setEmail(email);
              }
            }}
          ></VerifyEmail>
        </motion.div>
      ) : (
        <RegisterForm
          email={email}
          onBack={() => setRegisterForm(false)}
        ></RegisterForm>
      )}
    </div>
  );
};

export default SignUp;
