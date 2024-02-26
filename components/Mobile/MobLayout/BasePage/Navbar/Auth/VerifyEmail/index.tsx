import { FC, ReactNode, useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import { useDebounceFn, useKeyPress, useRequest } from 'ahooks';
import Schema from 'async-validator';
import { AuthType } from '@/store/zustand/userStore';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
interface VerifyEmailProps {
  onStatusChange: (status: boolean) => void;
  onNext: (email: string, inviteCode?: string) => void;
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
    inviteCode: string | null;
  }>({
    email: value || '',
    inviteCode: null
  });

  const [formState, setFormState] = useState({
    inviteCode: {
      status: 'default',
      errorMessage: ''
    },
    email: {
      status: 'default',
      errorMessage: ''
    }
  });

  // const [status, setStatus] = useState<any>('default');
  // const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { run: inviteCodeVerify, loading: emailLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.checkInviteCode(formData.inviteCode!);
      return res;
    },
    {
      onSuccess(res) {
        if (res.valid) {
          onNext(formData.email, formData.inviteCode!);
        } else {
          setFormState({
            ...formState,
            inviteCode: {
              status: 'error',
              errorMessage: 'Invalid invite code'
            }
          });
        }
      },
      onError(e: any) {
        errorMessage(e);
      },
      manual: true,
      debounceWait: 500
    }
  );

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
          setFormState({
            ...formState,
            email: {
              status: 'error',
              errorMessage: errors?.[0].message || ''
            }
          });
          // setErrorMessage(errors?.[0].message || '');
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
          setFormState({
            ...formState,
            email: {
              status: 'success',
              errorMessage: ''
            }
          });
          if (formData.inviteCode) inviteCodeVerify();
          else onNext(formData.email);
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
    <div className="flex h-full w-full flex-col items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[32px]">
        {EmailTitle}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          name="email"
          theme="light"
          clear
          state={formState.email.status as any}
          errorMessage={formState.email.errorMessage}
          delay={500}
          isMobile
          onChange={(e) => {
            setFormState({
              ...formState,
              email: {
                status: 'default',
                errorMessage: ''
              }
            });
            // validator.validate(
            //   { email: e.target.value },
            //   (errors, fields) => {
            //     if (errors?.[0]) {
            //       setStatus('error');
            //       setErrorMessage(errors?.[0].message || '');
            //       onStatusChange(false);
            //     } else {
            //       setStatus('success');
            //       setErrorMessage('');
            //       onStatusChange(true);
            //     }
            //   }
            // );
            setFormData({
              ...formData,
              email: e.target.value
            });
          }}
          onBlur={(e) => {
            validator.validate({ email: e.target.value }, (errors, fields) => {
              if (errors?.[0]) {
                setFormState({
                  ...formState,
                  email: {
                    status: 'error',
                    errorMessage: errors?.[0].message || ''
                  }
                });
                onStatusChange(false);
              } else {
                setFormState({
                  ...formState,
                  email: {
                    status: 'success',
                    errorMessage: ''
                  }
                });
                onStatusChange(true);
              }
            });
          }}
          defaultValue={formData.email}
        ></Input>
        {type === AuthType.SIGN_UP && (
          <Input
            label="Invite Code (Optional)"
            type="text"
            placeholder="Enter your invite code"
            name="inviteCode"
            theme="light"
            isMobile
            state={formState.inviteCode.status as any}
            clear
            errorMessage={formState.inviteCode.errorMessage}
            delay={500}
            onChange={(e) => {
              setFormData({
                ...formData,
                inviteCode: e.target.value
              });
              setFormState({
                ...formState,
                inviteCode: {
                  status: 'default',
                  errorMessage: ''
                }
              });
            }}
            defaultValue={formData.inviteCode || ''}
          ></Input>
        )}
        <Button
          onClick={verifyEmail}
          block
          type="primary"
          disabled={loading}
          icon={<RightArrowIcon size={24}></RightArrowIcon>}
          iconPosition="right"
          loading={loading}
          className="
          button-text-m border-auth-primary-button-border-color bg-auth-primary-button-bg
          py-4
          uppercase
          text-auth-primary-button-text-color
          hover:border-auth-primary-button-border-hover-color
          hover:bg-auth-primary-button-hover-bg
          hover:text-auth-primary-button-text-hover-color"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
