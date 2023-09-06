import { AppRootState } from '@/store/redux';
import { UnLoginType } from '@/store/redux/modules/user';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import EmailVerify from './EmailVerify';
import Login from './Login';
import SignUp from './SignUp';

interface AuthProps {}

const Auth: FC<AuthProps> = (props) => {
  const loginType = useSelector((state: AppRootState) => {
    return state.user.unLoginType;
  });

  switch (loginType) {
    case UnLoginType.EMAIL_VERIFY:
      return <EmailVerify></EmailVerify>;
    case UnLoginType.SIGN_UP:
      return <SignUp></SignUp>;
    case UnLoginType.LOGIN:
    default:
      return <Login></Login>;
  }
};

export default Auth;
