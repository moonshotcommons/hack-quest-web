import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCountDown, useDebounceFn } from 'ahooks';
import { message } from 'antd';
import Link from 'next/link';
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
            setAuthType(AuthType.SIGN_UP);
          }
        };
      case AuthType.FORGOT_PASSWORD:
        return {
          text: 'Resend Link',
          handle: () => {
            sendEmail(authRouteType.params?.email);
          }
        };
      default:
        return {
          text: 'Back',
          handle: () =>
            authRouteType.prevType && setAuthType(authRouteType.prevType)
        };
    }
  }, [authRouteType.prevType]);

  useEffect(() => {
    if (authRouteType.prevType === AuthType.FORGOT_PASSWORD) {
      setTargetDate(Date.now() + 30 * 1000);
    }
  }, [authRouteType.prevType]);

  return (
    <div className="w-full h-full flex-col flex items-center">
      <div className="flex flex-col gap-[25px]">
        <h1 className="text-white text-[2rem] font-next-book leading-[125%] tracking-[0.64px]">
          Verify Your Email
        </h1>
        <div className="text-white font-next-book leading-[160%] text-[14px] -tracking-[0.154px]">
          <span>
            Please verify your account via the link in the e-mail and follow the
            instruction to login.{<br />}
          </span>
          <p className="whitespace-nowrap">{`If you don't receive an email from us, please check your spam`}</p>
          <p>
            <span>folder or</span>
            <Link
              className="text-white font-next-book -tracking-[0.154px] text-left mt-1 cursor-pointer underline ml-1"
              href={'mailto:founder@hackquest.io'}
              target="_blank"
            >
              Contact customer support
            </Link>
          </p>

          {/* <Image src={Logo} alt="logo" width={191} className="mt-[2rem]"></Image> */}
        </div>

        <Button
          onClick={resendButtonParams.handle}
          block
          disabled={!!Math.floor(countdown / 1000)}
          className={cn(
            `
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          `,
            !!Math.floor(countdown / 1000)
              ? 'opacity-60 cursor-not-allowed'
              : ''
          )}
        >
          {`${resendButtonParams.text}  ${
            Math.floor(countdown / 1000) > 0
              ? Math.floor(countdown / 1000) + 's'
              : ''
          }`}
        </Button>

        <Button
          onClick={backButtonParams.handle}
          block
          className="
          font-next-book
          text-[1.125rem]
          border
          bg-transparent
          text-white hover:text-auth-ghost-button-text-hover-color
          border-white hover:border-auth-ghost-button-border-hover-color
    "
        >
          {backButtonParams.text}
        </Button>
      </div>
    </div>
  );
};

export default EmailVerify;
