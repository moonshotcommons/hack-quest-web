import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCountDown, useDebounceFn } from 'ahooks';
import { message } from 'antd';
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
            // sendEmail(authRouteType.params?.email);
            setAuthType(AuthType.CHANGE_PASSWORD);
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
    <div className="w-full h-full flex-col flex justify-between">
      <div className="flex flex-col gap-6">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="64" height="64" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.3063 14.187C55.8162 11.9824 53.3273 10.663 50.6663 10.667H13.333C8.91473 10.667 5.33301 14.2487 5.33301 18.667V45.3337C5.33301 49.7519 8.91473 53.3337 13.333 53.3337H50.6663C55.0846 53.3337 58.6663 49.7519 58.6663 45.3337V18.667C58.6699 17.0715 58.1963 15.5113 57.3063 14.187ZM13.3327 16H50.666C51.432 16.001 52.1605 16.3312 52.666 16.9067L31.9994 28.9867L11.3594 16.88C11.8635 16.3214 12.5802 16.0018 13.3327 16ZM50.666 48.0006C52.1388 48.0006 53.3327 46.8067 53.3327 45.334V22.6406L34.666 33.5739C33.8558 34.044 32.936 34.2923 31.9993 34.2939C31.0651 34.3004 30.1455 34.0613 29.3327 33.6006L10.666 22.6406V45.334C10.666 46.8067 11.8599 48.0006 13.3327 48.0006H50.666Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h3 text-neutral-off-black">Verify Your Email</h1>
        <p className="body-l text-neutral-medium-gray">
          Please verify your account via the link in the e-mail and follow the
          instruction to login
          {/* <p className="whitespace-nowrap">{`If you don't receive an email from us, please check your spam`}</p> */}
          {/* <p>
            <span>folder or</span>
            <Link
              className="text-white font-next-book -tracking-[0.154px] text-left mt-1 cursor-pointer underline ml-1"
              href={'mailto:founder@hackquest.io'}
              target="_blank"
            >
              Contact customer support
            </Link>
          </p> */}
          {/* <Image src={Logo} alt="logo" width={191} className="mt-[2rem]"></Image> */}
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-[4rem] w-full">
        <Button
          onClick={resendButtonParams.handle}
          block
          disabled={!!Math.floor(countdown / 1000)}
          className={cn(
            `
          py-4 uppercase button-text-l
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
          ghost
          className="
          py-4 uppercase button-text-l border-neutral-off-black
    "
        >
          {backButtonParams.text}
        </Button>
      </div>
    </div>
  );
};

export default EmailVerify;
