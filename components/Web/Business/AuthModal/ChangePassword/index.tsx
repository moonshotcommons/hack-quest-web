import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { useRedirect } from '@/hooks/router/useRedirect';
import { useValidator } from '@/hooks/auth/useValidator';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useDebounceFn } from 'ahooks';
import { FC, useEffect, useState } from 'react';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import webApi from '@/service';
import { BurialPoint } from '@/helper/burialPoint';
import message from 'antd/es/message';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface ChangePasswordProps {}

enum ChangeStateType {
  CHANGE = 'change',
  SUCCESS = 'success',
  FAIL = 'fail'
}

const Success = () => {
  const { redirectToUrl } = useRedirect();
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(5);
  const setAuthType = useUserStore((state) => state.setAuthType);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else {
      setAuthType(AuthType.LOGIN);
      redirectToUrl('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);
  return (
    <div className="flex flex-col gap-[25px]">
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

        <h3 className="text-h3 text-neutral-off-black">{t('password_changed')}</h3>
        <p className="body-l text-neutral-medium-gray">{t('password_changed_description')}</p>
      </div>
      <Button
        onClick={() => {
          setAuthType(AuthType.LOGIN);
          redirectToUrl('/');
        }}
        type="primary"
        block
        className="
        button-text-l border-auth-primary-button-border-color bg-auth-primary-button-bg
      py-4 uppercase
      text-auth-primary-button-text-color hover:border-auth-primary-button-border-hover-color
      hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color
      "
      >
        {`Back to Log in (${countDown}s)`}
      </Button>
    </div>
  );
};
const Fail = () => {
  const { redirectToUrl } = useRedirect();
  const setAuthType = useUserStore((state) => state.setAuthType);
  return (
    <div className="flex h-full w-full flex-col justify-between gap-8">
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

        <h3 className="text-h3 text-neutral-off-black">Verification Failed! 😵</h3>
        <p className="body-l text-neutral-medium-gray">Your token has expired! Please try again.</p>
      </div>
      <Button
        type="primary"
        onClick={() => {
          setAuthType(AuthType.LOGIN);
          redirectToUrl('/');
        }}
        block
        className="
        button-text-l border-auth-primary-button-border-color bg-auth-primary-button-bg
          py-4 uppercase
          text-auth-primary-button-text-color hover:border-auth-primary-button-border-hover-color
          hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color
          "
      >
        Back to Log in
      </Button>
    </div>
  );
};

const ChangeForm = ({ changeState }: { changeState: (state: ChangeStateType) => void }) => {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const token = query.get('token');
  const [formData, setFormData] = useState<{
    newPassword: string;
    reenterPassword: string;
    isForgot: boolean;
    token: string;
  }>({
    newPassword: '',
    reenterPassword: '',
    isForgot: true,
    token: token as string
  });

  const [formState, setFormState] = useState({
    newPassword: {
      status: 'default',
      errorMessage: ''
    },
    reenterPassword: {
      status: 'default',
      errorMessage: ''
    }
  });

  const { validator } = useValidator(['newPassword', 'reenterPassword']);
  const [loading, setLoading] = useState(false);
  const { run: onUpdate } = useDebounceFn(
    () => {
      setLoading(true);
      validator.validate(formData, async (errors, fields) => {
        if (!errors) {
          const status: any = { ...formState };
          for (let key in status) {
            status[key] = { status: 'success', errorMessage: '' };
          }
          try {
            const res = (await webApi.userApi.updatePassword(formData)) as any;
            changeState(ChangeStateType.SUCCESS);
            BurialPoint.track('login-忘记密码重置成功');
          } catch (e: any) {
            BurialPoint.track('login-忘记密码重置失败', { message: e?.msg });
            message.error(e.msg);
            changeState(ChangeStateType.FAIL);
          }
          setLoading(false);
        } else {
          // console.log('产生错误', errors, fields);
          const status: any = { ...formState };
          errors.map((error) => {
            status[error.field as string] = {
              status: 'error',
              errorMessage: error.message
            };
          });
          setFormState(status);
          setLoading(false);
        }
      });
    },
    { wait: 500 }
  );

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full flex-col gap-[24px]">
        <Input
          label={t('password')}
          type="password"
          name="password"
          placeholder={t('password')}
          theme="light"
          state={formState.newPassword.status as any}
          errorMessage={formState.newPassword.errorMessage}
          delay={500}
          rules={{
            type: 'string',
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
            message: 'Incorrect Password'
          }}
          onChange={(e) => {
            setFormData({
              ...formData,
              newPassword: e.target.value
            });
          }}
        ></Input>

        <Input
          label="Re-enter password"
          type="password"
          placeholder="Confirm your password"
          theme="light"
          name="reenterPassword"
          state={formState.reenterPassword.status as any}
          errorMessage={formState.reenterPassword.errorMessage}
          delay={500}
          rules={[
            {
              type: 'string',
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
              message: 'Use 8 or more characters with a mix of letters & numbers'
            },
            {
              type: 'string',
              message: 'Those passwords didn’t match. Try again.',
              validator(rule, value) {
                return value === formData.newPassword;
              }
            }
          ]}
          onChange={(e) => {
            setFormData({
              ...formData,
              reenterPassword: e.target.value
            });
          }}
        ></Input>
      </div>

      <Button
        onClick={onUpdate}
        block
        type="primary"
        loading={loading}
        disabled={loading}
        iconPosition="right"
        icon={<RightArrowIcon></RightArrowIcon>}
        className="
        button-text-l border-auth-primary-button-border-color bg-auth-primary-button-bg
              py-4 uppercase
              text-auth-primary-button-text-color hover:border-auth-primary-button-border-hover-color
              hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color
              "
      >
        Continue
      </Button>
    </div>
  );
};

const ChangePassword: FC<ChangePasswordProps> = (props) => {
  const [changeState, setChangeState] = useState(ChangeStateType.CHANGE);

  return (
    <>
      {changeState === ChangeStateType.CHANGE && (
        <ChangeForm changeState={(state) => setChangeState(state)}></ChangeForm>
      )}
      {changeState === ChangeStateType.SUCCESS && <Success></Success>}
      {changeState === ChangeStateType.FAIL && <Fail></Fail>}
    </>
  );
};

export default ChangePassword;
