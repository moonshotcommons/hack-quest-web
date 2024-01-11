'use client';

import { FC, useEffect } from 'react';
import ChangePassword from './ChangePassword';
import EmailVerify from './EmailVerify';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import SignUp from './SignUp';
import VerifyConfirmed from './VerifyConfirmed';
import CheckInviteCode from './CheckInviteCode';
import { useSearchParams } from 'next/navigation';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';

interface AuthProps {}

const Auth: FC<AuthProps> = (props) => {
  const query = useSearchParams();

  const { authRouteType, setAuthType } = useUserStore(
    useShallow((state) => ({
      authRouteType: state.authRouteType,
      setAuthType: state.setAuthType
    }))
  );

  useEffect(() => {
    const type = query.get('type');
    if (type) {
      setAuthType(type as AuthType);
    } else {
      setAuthType(AuthType.LOGIN);
    }
  }, []);

  if (query.get('state')) {
    return <VerifyConfirmed></VerifyConfirmed>;
  }
  switch (authRouteType.type) {
    case AuthType.EMAIL_VERIFY:
      return <EmailVerify></EmailVerify>;
    case AuthType.FORGOT_PASSWORD:
      return <ForgotPassword></ForgotPassword>;
    case AuthType.CHANGE_PASSWORD:
      return <ChangePassword></ChangePassword>;
    case AuthType.VERIFYING:
      return <VerifyConfirmed></VerifyConfirmed>;
    case AuthType.INVITE_CODE:
      return <CheckInviteCode></CheckInviteCode>;
    case AuthType.SIGN_UP:
      return <SignUp></SignUp>;
    case AuthType.LOGIN:
    default:
      return <Login></Login>;
  }
};

export default Auth;
