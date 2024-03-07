import { BurialPoint } from '@/helper/burialPoint';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';

import { useDebounceFn } from 'ahooks';
import { message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Button from '@/components/Common/Button';
import { AuthType, useUserStore } from '@/store/zustand/userStore';

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = (props) => {
  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: ''
  });

  const { authRouteType, setAuthType } = useUserStore(
    useShallow((state) => ({
      authRouteType: state.authRouteType,
      setAuthType: state.setAuthType
    }))
  );
  const [status, setStatus] = useState<any>('default');
  const [errorMessage, setErrorMessage] = useState('');
  const { validator } = useValidator(['email']);

  const [loading, setLoading] = useState(false);
  const { run: sendEmail } = useDebounceFn(
    () => {
      setLoading(true);
      BurialPoint.track('login-忘记密码发送邮件');
      validator.validate(formData, async (errors, fields) => {
        if (errors?.[0]) {
          setStatus('error');
          setErrorMessage(errors?.[0].message || '');
          setLoading(false);
        } else {
          try {
            setStatus('success');
            setErrorMessage('');
            const res = await webApi.userApi.forgetPassword(formData.email);
            BurialPoint.track('login-忘记密码发送邮件成功');

            setAuthType({
              type: AuthType.EMAIL_VERIFY,
              params: { email: formData.email }
            });
          } catch (e: any) {
            BurialPoint.track('login-忘记密码发送邮件失败', {
              message: e?.msg
            });
            setStatus('error');
            setErrorMessage(e.msg || '');
          }
          setLoading(false);
        }
      });
    },
    { wait: 500 }
  );

  useEffect(() => {
    const { params } = authRouteType;
    if (params?.email) {
      setFormData({ email: params.email });
    } else {
      message.error('email does not exist!');
      setAuthType(AuthType.LOGIN);
    }
  }, [authRouteType]);

  return (
    <div className="flex h-full flex-col justify-between ">
      <div className="flex flex-col gap-6">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50.6663 29.333V23.9997C50.6663 13.6904 42.309 5.33301 31.9997 5.33301C21.6904 5.33301 13.333 13.6904 13.333 23.9997V29.333C8.91473 29.333 5.33301 32.9147 5.33301 37.333V50.6663C5.33301 55.0846 8.91473 58.6663 13.333 58.6663H50.6663C55.0846 58.6663 58.6663 55.0846 58.6663 50.6663V37.333C58.6663 32.9147 55.0846 29.333 50.6663 29.333ZM18.666 23.9993C18.666 16.6356 24.6356 10.666 31.9993 10.666C39.3631 10.666 45.3327 16.6356 45.3327 23.9993V29.3327H18.666V23.9993ZM50.666 53.3327C52.1388 53.3327 53.3327 52.1388 53.3327 50.666V37.3327C53.3327 35.8599 52.1388 34.666 50.666 34.666H13.3327C11.8599 34.666 10.666 35.8599 10.666 37.3327V50.666C10.666 52.1388 11.8599 53.3327 13.3327 53.3327H50.666Z"
            fill="white"
          />
        </svg>

        <h3 className="text-h3 font-GT-Walsheim-Trial text-neutral-off-white">
          Forgot your password?
        </h3>
        <div className="flex flex-col gap-1">
          <p className="body-l font-GT-Walsheim-Trial text-neutral-light-gray">
            We will send you a link to your email to reset password.
          </p>
          <p className="text-neutral-medium-gray underline">{formData.email}</p>
        </div>
      </div>
      <div className="mt-[4rem] flex w-full flex-col gap-4">
        <Button
          onClick={sendEmail}
          block
          type="mantle"
          loading={loading}
          disabled={loading}
          className="gap-[15px] rounded-[10px] font-GT-Walsheim-Trial text-[18px] leading-[140%]"
        >
          Send me link
        </Button>

        <Button
          onClick={() =>
            authRouteType.prevType && setAuthType(authRouteType.prevType)
          }
          ghost
          block
          className="
          gap-[15px] rounded-[10px] border-white font-GT-Walsheim-Trial text-[18px] leading-[140%] text-white
          "
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
