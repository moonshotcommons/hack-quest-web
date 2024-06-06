import { BurialPoint } from '@/helper/burialPoint';
import { useValidator } from '@/hooks/auth/useValidator';
import webApi from '@/service';

import { useDebounceFn } from 'ahooks';
import message from 'antd/es/message';
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
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38 21.9998V17.9998C38 10.2678 31.732 3.99976 24 3.99976C16.268 3.99976 10 10.2678 10 17.9998V21.9998C6.68629 21.9998 4 24.686 4 27.9998V37.9998C4 41.3135 6.68629 43.9998 10 43.9998H38C41.3137 43.9998 44 41.3135 44 37.9998V27.9998C44 24.686 41.3137 21.9998 38 21.9998ZM13.9998 17.9995C13.9998 12.4767 18.4769 7.99951 23.9998 7.99951C29.5226 7.99951 33.9998 12.4767 33.9998 17.9995V21.9995H13.9998V17.9995ZM37.9998 39.9995C39.1043 39.9995 39.9998 39.1041 39.9998 37.9995V27.9995C39.9998 26.8949 39.1043 25.9995 37.9998 25.9995H9.99976C8.89519 25.9995 7.99976 26.8949 7.99976 27.9995V37.9995C7.99976 39.1041 8.89519 39.9995 9.99976 39.9995H37.9998Z"
            fill="#131313"
          />
        </svg>

        <h3 className="text-h3-mob text-neutral-off-black">Forgot your password?</h3>
        <div className="flex flex-col gap-1">
          <p className="body-m text-neutral-medium-gray">We will send you a link to your email to reset password.</p>
          <p className="underline-m text-neutral-rich-gray">{formData.email}</p>
        </div>
      </div>
      <div className="mt-[4rem] flex w-full flex-col gap-4">
        <Button
          onClick={sendEmail}
          block
          type="primary"
          loading={loading}
          disabled={loading}
          className="
          button-text-m border-auth-primary-button-border-color bg-auth-primary-button-bg 
          py-4 uppercase
          text-auth-primary-button-text-color hover:border-auth-primary-button-border-hover-color
          hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color
          "
        >
          Send me link
        </Button>

        <Button
          onClick={() => authRouteType.prevType && setAuthType(authRouteType.prevType)}
          ghost
          block
          className="
          button-text-m border-neutral-off-black py-4  uppercase
    "
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
