import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCountDown, useDebounceFn } from 'ahooks';
import message from 'antd/es/message';
import { FC, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
interface EmailVerifyProps {}

const EmailVerify: FC<EmailVerifyProps> = (props) => {
  const { setAuthType, authRouteType } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      authRouteType: state.authRouteType
    }))
  );
  const [targetDate, setTargetDate] = useState<number>();

  const [countdown] = useCountDown({
    targetDate
  });

  const { run: sendEmail } = useDebounceFn(
    async (email) => {
      if (!email) {
        message.error('Email does not exist!');
        setAuthType(AuthType.LOGIN);
        return;
      }
      const res = await webApi.userApi.forgetPassword(email);
      setTargetDate(Date.now() + 30 * 1000);
    },
    { wait: 500 }
  );

  const backButtonParams = useMemo(() => {
    switch (authRouteType.prevType) {
      case AuthType.LOGIN:
        return {
          text: 'Back to Log in',
          handle: () => setAuthType(AuthType.LOGIN)
        };
      case AuthType.SIGN_UP:
        return {
          text: 'Change Email',
          handle: () => setAuthType(AuthType.SIGN_UP)
        };
      default:
        return {
          text: 'Back',
          handle: () => setAuthType(AuthType.LOGIN)
        };
    }
  }, [authRouteType.prevType]);

  const resendButtonParams = useMemo(() => {
    switch (authRouteType.prevType) {
      case AuthType.LOGIN:
        return {
          text: 'Log in to Resend',
          handle: () => {
            // setTargetDate(Date.now() + 30 * 1000);
            setAuthType(AuthType.LOGIN);
          }
        };
      case AuthType.SIGN_UP:
        return {
          text: 'Log in to Resend',
          handle: () => {
            // setTargetDate(Date.now() + 30 * 1000);
            setAuthType(AuthType.LOGIN);
          }
        };
      case AuthType.FORGOT_PASSWORD:
        return {
          text: 'Resend Link',
          handle: () => {
            // sendEmail(authRouteType.params?.email);
            setAuthType(AuthType.CHANGE_PASSWORD);
          }
        };
      default:
        return {
          text: 'Back',
          handle: () => authRouteType.prevType && setAuthType(authRouteType.prevType)
        };
    }
  }, [authRouteType.prevType]);

  useEffect(() => {
    if (authRouteType.prevType === AuthType.FORGOT_PASSWORD) {
      setTargetDate(Date.now() + 30 * 1000);
    }
  }, [authRouteType.prevType]);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-6">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.98 10.64C41.8624 8.98653 39.9958 7.997 38 8.00001H10C6.68629 8.00001 4 10.6863 4 14V34C4 37.3137 6.68629 40 10 40H38C41.3137 40 44 37.3137 44 34V14C44.0027 12.8034 43.6475 11.6332 42.98 10.64ZM9.99978 11.9997H37.9998C38.5742 12.0005 39.1206 12.2482 39.4998 12.6797L23.9998 21.7397L8.51978 12.6597C8.89789 12.2408 9.43542 12.0011 9.99978 11.9997ZM37.9998 36.0002C39.1043 36.0002 39.9998 35.1048 39.9998 34.0002V16.9802L25.9998 25.1802C25.3921 25.5327 24.7023 25.719 23.9998 25.7202C23.2991 25.7251 22.6094 25.5457 21.9998 25.2002L7.99976 16.9802V34.0002C7.99976 35.1048 8.89519 36.0002 9.99976 36.0002H37.9998Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h3-mob text-neutral-off-black">Verify Your Email</h1>
        <p className="body-m text-neutral-medium-gray">
          Please verify your account via the link in the e-mail and follow the instruction to login
        </p>
      </div>
      <div className="mt-[4rem] flex w-full flex-col gap-4">
        <Button
          onClick={resendButtonParams.handle}
          block
          disabled={!!Math.floor(countdown / 1000)}
          className={cn(
            `
          button-text-m border-auth-primary-button-border-color bg-auth-primary-button-bg
          py-4 uppercase
          text-auth-primary-button-text-color hover:border-auth-primary-button-border-hover-color
          hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color
          `,
            !!Math.floor(countdown / 1000) ? 'cursor-not-allowed opacity-60' : ''
          )}
        >
          {`${resendButtonParams.text}  ${Math.floor(countdown / 1000) > 0 ? Math.floor(countdown / 1000) + 's' : ''}`}
        </Button>

        <Button
          onClick={backButtonParams.handle}
          block
          ghost
          className="
          button-text-m border-neutral-off-black py-4 uppercase 
    "
        >
          {backButtonParams.text}
        </Button>
      </div>
    </div>
  );
};

export default EmailVerify;
