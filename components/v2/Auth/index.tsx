import { AppRootState } from '@/store/redux';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailVerify from './EmailVerify';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import SignUp from './SignUp';

interface AuthProps {}

const Auth: FC<AuthProps> = (props) => {
  const query = useRouter().query;
  const dispatch = useDispatch();
  const loginRouteType = useSelector((state: AppRootState) => {
    return state.user.loginRouteType;
  });

  useEffect(() => {
    const { loginType } = query;
    if (loginType) {
      dispatch(
        setUnLoginType(UnLoginType[loginType as keyof typeof UnLoginType])
      );
    }
  }, [query]);

  switch (loginRouteType.type) {
    case UnLoginType.EMAIL_VERIFY:
      return <EmailVerify></EmailVerify>;
    case UnLoginType.FORGOT_PASSWORD:
      return <ForgotPassword></ForgotPassword>;
    case UnLoginType.SIGN_UP:
      return <SignUp></SignUp>;
    case UnLoginType.LOGIN:
    default:
      return <Login></Login>;
  }
};

export default Auth;
