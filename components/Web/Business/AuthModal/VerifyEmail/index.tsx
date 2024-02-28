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
  }>({
    email: value || ''
  });

  const [formState, setFormState] = useState({
    email: {
      status: 'default',
      errorMessage: ''
    }
  });

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
    <div className="flex h-full w-full flex-col items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[20px]">
        {EmailTitle}

        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          theme="dark"
          state={formState.email.status as any}
          errorMessage={formState.email.errorMessage}
          clear
          source="mantle"
          delay={500}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value
            });

            setFormState({
              ...formState,
              email: {
                status: 'default',
                errorMessage: ''
              }
            });

            validator.validate({ email: e.target.value }, (errors, fields) => {
              if (errors?.[0]) {
                onStatusChange(false);
              } else {
                onStatusChange(true);
              }
            });
          }}
          // onBlur={(e) => {
          //   validator.validate({ email: e.target.value }, (errors, fields) => {
          //     if (errors?.[0]) {
          //       setFormState({
          //         ...formState,
          //         email: {
          //           status: 'error',
          //           errorMessage: errors?.[0].message || ''
          //         }
          //       });
          //       onStatusChange(false);
          //     } else {
          //       setFormState({
          //         ...formState,
          //         email: {
          //           status: 'success',
          //           errorMessage: ''
          //         }
          //       });
          //       onStatusChange(true);
          //     }
          //   });
          // }}
          defaultValue={formData.email}
        ></Input>
        <Button
          onClick={verifyEmail}
          block
          type="mantle"
          disabled={loading}
          icon={<RightArrowIcon size={24}></RightArrowIcon>}
          iconPosition="right"
          loading={loading}
          className="gap-[15px] rounded-[10px] font-GT-Walsheim-Trial text-[18px] leading-[140%]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
