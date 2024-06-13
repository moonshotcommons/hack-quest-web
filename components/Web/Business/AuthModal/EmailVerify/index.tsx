import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCountDown, useDebounceFn } from 'ahooks';
import message from 'antd/es/message';
import { FC, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface EmailVerifyProps {}

const EmailVerify: FC<EmailVerifyProps> = (props) => {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
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
          text: t('back_to_log_in'),
          handle: () => setAuthType(AuthType.LOGIN)
        };
      case AuthType.SIGN_UP:
        return {
          text: t('change_email'),
          handle: () => setAuthType(AuthType.SIGN_UP)
        };
      default:
        return {
          text: t('back'),
          handle: () => setAuthType(AuthType.LOGIN)
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authRouteType.prevType]);

  const resendButtonParams = useMemo(() => {
    switch (authRouteType.prevType) {
      case AuthType.LOGIN:
        return {
          text: t('log_in_to_resend'),
          handle: () => {
            // setTargetDate(Date.now() + 30 * 1000);
            setAuthType(AuthType.LOGIN);
          }
        };
      case AuthType.SIGN_UP:
        return {
          text: t('log_in_to_resend'),
          handle: () => {
            // setTargetDate(Date.now() + 30 * 1000);
            setAuthType(AuthType.LOGIN);
          }
        };
      case AuthType.FORGOT_PASSWORD:
        return {
          text: t('resend_link'),
          handle: () => {
            // sendEmail(authRouteType.params?.email);
            setAuthType(AuthType.CHANGE_PASSWORD);
          }
        };
      default:
        return {
          text: t('back'),
          handle: () => authRouteType.prevType && setAuthType(authRouteType.prevType)
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authRouteType.prevType]);

  useEffect(() => {
    if (authRouteType.prevType === AuthType.FORGOT_PASSWORD) {
      setTargetDate(Date.now() + 30 * 1000);
    }
  }, [authRouteType.prevType]);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-6">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          button-text-l border-auth-primary-button-border-color bg-auth-primary-button-bg
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
          button-text-l border-neutral-off-black py-4 uppercase
    "
        >
          {backButtonParams.text}
        </Button>
      </div>
    </div>
  );
};

export default EmailVerify;
