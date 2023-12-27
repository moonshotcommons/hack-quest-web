import Button from '@/components/v2/Common/Button';
import { cn } from '@/helper/utils';
import { useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import webApi from '@/service';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useCountDown, useDebounceFn } from 'ahooks';
import { message } from 'antd';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

interface EmailVerifyProps {}

const EmailVerify: FC<EmailVerifyProps> = (props) => {
  const loginRouteType = useGetUserUnLoginType();
  const dispatch = useDispatch();

  const [targetDate, setTargetDate] = useState<number>();

  const [countdown] = useCountDown({
    targetDate
  });

  const { run: sendEmail } = useDebounceFn(
    async (email) => {
      if (!email) {
        message.error('Email does not exist!');
        dispatch(setUnLoginType(UnLoginType.LOGIN));
        return;
      }
      const res = await webApi.userApi.forgetPassword(email);
      setTargetDate(Date.now() + 30 * 1000);
    },
    { wait: 500 }
  );

  const backButtonParams = useMemo(() => {
    switch (loginRouteType.prevType) {
      case UnLoginType.LOGIN:
        return {
          text: 'Back to Log in',
          handle: () => dispatch(setUnLoginType(UnLoginType.LOGIN))
        };
      case UnLoginType.SIGN_UP:
        return {
          text: 'Change Email',
          handle: () => dispatch(setUnLoginType(UnLoginType.SIGN_UP))
        };
      default:
        return {
          text: 'Back',
          handle: () => dispatch(setUnLoginType(UnLoginType.LOGIN))
        };
    }
  }, [loginRouteType.prevType]);

  const resendButtonParams = useMemo(() => {
    switch (loginRouteType.prevType) {
      case UnLoginType.LOGIN:
        return {
          text: 'Log in to Resend',
          handle: () => {
            // setTargetDate(Date.now() + 30 * 1000);
            dispatch(setUnLoginType(UnLoginType.LOGIN));
          }
        };
      case UnLoginType.SIGN_UP:
        return {
          text: 'Log in to Resend',
          handle: () => {
            // setTargetDate(Date.now() + 30 * 1000);
            dispatch(setUnLoginType(UnLoginType.SIGN_UP));
          }
        };
      case UnLoginType.FORGOT_PASSWORD:
        return {
          text: 'Resend Link',
          handle: () => {
            sendEmail(loginRouteType.params?.email);
          }
        };
      default:
        return {
          text: 'Back',
          handle: () => dispatch(setUnLoginType(loginRouteType.prevType))
        };
    }
  }, [loginRouteType.prevType]);

  useEffect(() => {
    if (loginRouteType.prevType === UnLoginType.FORGOT_PASSWORD) {
      setTargetDate(Date.now() + 30 * 1000);
    }
  }, [loginRouteType.prevType]);

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
