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
    <div className="h-full max-w-[33.0625rem] flex flex-col items-start gap-y-[25px] text-left ">
      <h1 className="text-[#FFF] text-[32px] font-next-poster leading-[160%] tracking-[0.64px]">
        Forgot your password?
      </h1>
      <p className="text-white font-next-book leading-[160%] -tracking-[0.154px] text-[14px]">
        We will send you a link to reset your password.{' '}
      </p>

      <Button
        onClick={sendEmail}
        block
        type="primary"
        loading={loading}
        disabled={loading}
        className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
      >
        Send me link
      </Button>

      <Button
        onClick={() =>
          authRouteType.prevType && setAuthType(authRouteType.prevType)
        }
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
        Back
      </Button>
    </div>
  );
};

export default ForgotPassword;
