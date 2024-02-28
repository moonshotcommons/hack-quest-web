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
import { useGetPageInfo } from '@/hooks/useGetPageInfo';
import { MOBILE_NAVBAR_HEIGHT } from '../constant';
interface AuthModalProps {
  changeNavState: VoidFunction;
}

export const AuthContext = createContext({
  changeNavState: () => {}
});

const logo = (
  <svg
    width="107"
    height="12"
    viewBox="0 0 107 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_5321_25038)">
      <path
        d="M50.5208 10.4201H47.327V1.59806H50.5208V10.4201ZM56.931 1.59806H53.1624L50.5208 5.49346V6.00907L53.436 10.4201H57.2046L53.7146 5.75126L56.931 1.59806ZM22.2595 1.59806V4.8257H19.7376V1.59806H16.5438V10.4201H19.7376V7.1467H22.2595V10.4201H25.4533V1.59806H22.2595ZM42.7736 8.10301C41.5143 8.10301 40.6525 7.16247 40.6525 6.00907C40.6525 4.85566 41.5143 3.91512 42.7736 3.91512C43.6881 3.91512 44.3441 4.37553 44.5215 4.59392L46.1079 2.53229C45.6737 2.15465 44.3341 1.29768 42.4238 1.29768C39.0376 1.29768 37.303 3.7803 37.303 6.00907C37.303 8.23783 39.0376 10.7204 42.4238 10.7204C44.3349 10.7204 45.6737 9.86348 46.1079 9.48584L44.5215 7.42421C44.3441 7.6426 43.6881 8.10301 42.7736 8.10301ZM33.9821 10.4217C33.4942 9.61987 32.5989 9.32737 31.7446 9.32737C30.8903 9.32737 29.995 9.61987 29.5072 10.4217H26.4808L30.0076 1.59648H33.4834L37.0102 10.4217H33.9837H33.9821ZM32.9621 7.38243L31.7438 4.21707L30.5255 7.38243C30.5255 7.38243 31.01 7.18691 31.7078 7.18691H31.7781C32.4768 7.18691 32.9604 7.38243 32.9604 7.38243H32.9621ZM33.9821 10.4217C33.4942 9.61987 32.5989 9.32737 31.7446 9.32737C30.8903 9.32737 29.995 9.61987 29.5072 10.4217H26.4808L30.0076 1.59648H33.4834L37.0102 10.4217H33.9837H33.9821ZM32.9621 7.38243L31.7438 4.21707L30.5255 7.38243C30.5255 7.38243 31.01 7.18691 31.7078 7.18691H31.7781C32.4768 7.18691 32.9604 7.38243 32.9604 7.38243H32.9621ZM107 1.59806H98.4378V3.90329H101.122V10.4201H104.316V3.90329H107V1.59806ZM87.4917 3.90329V1.59806H79.3696V10.4201H82.5633V10.4169H87.4917V8.11169H82.5633V7.00637H87.4917V5.00939H82.5633V3.90408H87.4917V3.90329ZM94.475 4.85645H92.6392C92.3606 4.85645 92.1347 4.64358 92.1347 4.38105C92.1347 4.11852 92.3606 3.90566 92.6392 3.90566H97.1417V1.60042H91.892C90.2487 1.60042 88.9191 2.86578 88.9409 4.41811C88.9618 5.94678 90.314 7.16247 91.9364 7.16247H93.7722C94.0508 7.16247 94.2767 7.37533 94.2767 7.63787C94.2767 7.9004 94.0508 8.11326 93.7722 8.11326H89.2714V10.4185H94.5194C96.1627 10.4185 97.4923 9.15314 97.4705 7.60081C97.4496 6.07214 96.0974 4.85645 94.475 4.85645ZM74.4713 1.59806V6.67052C74.4713 7.32172 73.9107 7.84994 73.2196 7.84994C72.5285 7.84994 71.9678 7.32172 71.9678 6.67052V1.59806H68.7741V6.99612C68.7741 9.30609 70.7345 10.7047 73.1861 10.722C75.657 10.7394 77.666 9.3731 77.666 7.04894V1.59806H74.4722H74.4713ZM65.8924 8.38526L67.8988 7.66388L67.7298 10.141C67.7298 10.141 65.1427 10.7204 62.3246 10.7204C58.7785 10.7204 57.2038 8.01787 57.2038 5.86006C57.2038 3.70225 58.9383 1.29847 62.3246 1.29847C65.7108 1.29847 67.2529 3.45391 67.1592 5.63616C67.109 6.81401 66.4731 7.85861 65.8924 8.30799V8.38526ZM62.3254 8.10301C63.4709 8.10301 64.0959 7.10177 64.0959 6.01222C64.0959 4.92267 63.4709 3.9159 62.3254 3.9159C61.1799 3.9159 60.5549 4.92267 60.5549 6.01222C60.5549 7.10177 61.1799 8.10301 62.3254 8.10301ZM10.8708 1.75731C12.0238 2.8437 12.7358 4.34242 12.7358 5.9996L12.4388 11.7572L6.36834 11.9992C4.60954 11.9992 3.01808 11.3275 1.8659 10.2419C0.712893 9.1563 0 7.65758 0 6.00039L0.256876 0.279876L6.36834 0C8.12714 0 9.7186 0.671703 10.8708 1.75731ZM8.99734 3.59897C8.33465 2.97457 7.41927 2.58748 6.4085 2.58748C4.38613 2.58748 2.74614 4.13271 2.74614 6.03824C2.74614 6.9906 3.15698 7.8531 3.81967 8.4775C4.48235 9.1019 5.39773 9.48899 6.4085 9.48899C8.43004 9.48899 10.07 7.94455 10.0709 6.03824C10.0709 5.08587 9.66003 4.22337 8.99734 3.59897Z"
        fill="#C4C4C4"
      />
    </g>
    <defs>
      <clipPath id="clip0_5321_25038">
        <rect width="107" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

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

  const pageInfo = useGetPageInfo();

  return (
    <motion.div
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          opacity: 1,
          pointerEvents: 'auto',
          height: `${pageInfo.windowHeight - MOBILE_NAVBAR_HEIGHT}px`
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
          opacity: 0,
          pointerEvents: 'none'
        }
      }}
      className="absolute bottom-0 top-[4rem] flex w-screen flex-col bg-[#202020]"
    >
      <div className="flex h-full flex-col px-4 py-[3.75rem]">
        <div className="mb-8 flex flex-col items-center gap-[10px]">
          <h1 className="text-[30px] font-medium leading-[110%] -tracking-[1.92px] text-white">
            Mantle University
          </h1>
          <div className="flex items-center">
            <p className="pr-[14px] text-[18px] leading-[130%] text-[#C4C4C4]">
              - Powered by{' '}
            </p>
            {logo}
          </div>
        </div>
        <AuthContext.Provider value={{ changeNavState }}>
          {authComponent}
        </AuthContext.Provider>
      </div>
    </motion.div>
  );
};

export default Auth;
