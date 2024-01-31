'use client';
import { FC, createContext, useMemo } from 'react';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import ChangePassword from './ChangePassword';
import EmailVerify from './EmailVerify';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import SignUp from './SignUp';
import VerifyConfirmed from './VerifyConfirmed';
import CheckInviteCode from './CheckInviteCode';
import { useRedirect } from '@/hooks/useRedirect';
import { motion } from 'framer-motion';
import { useCustomPathname } from '@/hooks/useCheckPathname';
interface AuthModalProps {
  changeNavState: VoidFunction;
}

export const AuthContext = createContext({
  changeNavState: () => {}
});

const Auth: FC<AuthModalProps> = ({ changeNavState }) => {
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const pathname = useCustomPathname();
  const queryState = query.get('state');
  const type = query.get('type');
  const { redirectToUrl } = useRedirect();
  const { authRouteType } = useUserStore(
    useShallow((state) => ({
      authRouteType: state.authRouteType
    }))
  );

  const authComponent = useMemo(() => {
    if (queryState) {
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
  }, [queryState, authRouteType.type]);

  return (
    <motion.div
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          opacity: 1,
          pointerEvents: 'auto'
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
          opacity: 0,
          pointerEvents: 'none'
        }
      }}
      className="absolute top-[4rem] px-5 py-[30px] bottom-0 w-screen bg-neutral-white border border-neutral-light-gray flex flex-col"
    >
      <AuthContext.Provider value={{ changeNavState }}>
        {authComponent}
      </AuthContext.Provider>
    </motion.div>
  );
};

export default Auth;
