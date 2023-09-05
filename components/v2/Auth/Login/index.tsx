import { useValidator } from '@/hooks/useValidator';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserLogin from '../UserLogin';
import VerifyEmail from '../VerifyEmail';

interface LoginProps {}

const Login: FC<LoginProps> = (props) => {
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('619730086@qq.com');
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
          Create a account
        </span>
        <br />
        It takes less than a minute.
      </p>
    </div>
  );

  return (
    <div className="w-full  h-full flex justify-end items-center">
      {!showLogin ? (
        <VerifyEmail
          validator={validator}
          emailTitle={EmailTitle}
          value={email}
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

export default Login;
