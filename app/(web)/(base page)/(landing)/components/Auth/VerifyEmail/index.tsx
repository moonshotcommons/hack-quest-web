import { FC, ReactNode, useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import { useDebounceFn, useKeyPress } from 'ahooks';
import Schema from 'async-validator';
import { AuthType } from '@/store/zustand/userStore';
interface VerifyEmailProps {
  onStatusChange: (status: boolean) => void;
  onNext: (email: string) => void;
  validator: Schema;
  emailTitle?: ReactNode;
  value?: string;
  type: AuthType;
}

const VerifyEmail: FC<VerifyEmailProps> = (props) => {
  const {
    onStatusChange,
    onNext,
    value,
    emailTitle: EmailTitle,
    validator,
    type
  } = props;

  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: value || ''
  });

  const [status, setStatus] = useState<any>('default');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { run: verifyEmail } = useDebounceFn(
    () => {
      setLoading(true);
      if (type === AuthType.LOGIN) {
        BurialPoint.track('login-登录next按钮');
      }
      if (type === AuthType.SIGN_UP) {
        BurialPoint.track('signup-注册next按钮');
      }

      validator.validate(formData, (errors, fields) => {
        if (errors?.[0]) {
          setStatus('error');
          setErrorMessage(errors?.[0].message || '');
          if (type === AuthType.LOGIN) {
            BurialPoint.track('login-登录邮箱验证失败', {
              message: errors?.[0].message || ''
            });
          }
          if (type === AuthType.SIGN_UP) {
            BurialPoint.track('signup-注册邮箱验证失败', {
              message: errors?.[0].message || ''
            });
          }
          setLoading(false);
        } else {
          if (type === AuthType.LOGIN) {
            BurialPoint.track('login-登录邮箱验证成功');
          }
          if (type === AuthType.SIGN_UP) {
            BurialPoint.track('signup-注册邮箱验证成功');
          }
          setStatus('success');
          setErrorMessage('');
          onNext(formData.email);
          setLoading(false);
        }
      });
    },
    { wait: 500 }
  );

  useKeyPress('enter', verifyEmail);

  useEffect(() => {
    // BurialPoint.track();
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      if (type === AuthType.LOGIN) {
        BurialPoint.track('login-登录邮箱验证停留时间', { duration });
      }
      if (type === AuthType.SIGN_UP) {
        BurialPoint.track('signup-注册邮箱验证停留时间', { duration });
      }
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[25px]">
        {EmailTitle}
        <div className="text-white">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            state={status}
            className="bg-[#212121] text-white"
            clear
            errorMessage={errorMessage}
            delay={500}
            onChange={(e) => {
              setStatus('default');
              setErrorMessage('');
              validator.validate(
                { email: e.target.value },
                (errors, fields) => {
                  if (errors?.[0]) {
                    setStatus('error');
                    setErrorMessage(errors?.[0].message || '');
                    onStatusChange(false);
                  } else {
                    setStatus('success');
                    setErrorMessage('');
                    onStatusChange(true);
                  }
                }
              );
              setFormData({
                ...formData,
                email: e.target.value
              });
            }}
            defaultValue={formData.email}
          ></Input>
        </div>
        <Button
          onClick={verifyEmail}
          block
          type="primary"
          disabled={loading}
          icon={<RightArrowIcon></RightArrowIcon>}
          iconPosition="right"
          loading={loading}
          className="bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
