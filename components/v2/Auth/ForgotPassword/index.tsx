import { BurialPoint } from '@/helper/burialPoint';
import { useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useDebounceFn } from 'ahooks';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../Common/Button';

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = (props) => {
  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: ''
  });
  const loginRouteParams = useGetUserUnLoginType();
  const [status, setStatus] = useState<any>('default');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { validator } = useValidator(['email']);
  const dispatch = useDispatch();
  const { run: sendEmail } = useDebounceFn(
    () => {
      BurialPoint.track('login-忘记密码发送邮件');
      validator.validate(formData, async (errors, fields) => {
        if (errors?.[0]) {
          setStatus('error');
          setErrorMessage(errors?.[0].message || '');
        } else {
          try {
            setStatus('success');
            setErrorMessage('');
            const res = await webApi.userApi.forgetPassword(formData.email);
            BurialPoint.track('login-忘记密码发送邮件成功');
            dispatch(
              setUnLoginType({
                type: UnLoginType.EMAIL_VERIFY,
                params: { email: formData.email }
              })
            );
          } catch (e: any) {
            BurialPoint.track('login-忘记密码发送邮件失败', {
              message: e?.msg
            });
            setStatus('error');
            setErrorMessage(e.msg || '');
          }
        }
      });
    },
    { wait: 500 }
  );

  useEffect(() => {
    const { params } = loginRouteParams;
    if (params?.email) {
      setFormData({ email: params.email });
    } else {
      message.error('email does not exist!');
      dispatch(setUnLoginType(UnLoginType.LOGIN));
    }
  }, [loginRouteParams]);

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
        onClick={() => dispatch(setUnLoginType(loginRouteParams.prevType))}
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
