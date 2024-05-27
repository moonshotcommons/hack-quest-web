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
interface ChangePasswordProps {}

enum ChangeStateType {
  CHANGE = 'change',
  SUCCESS = 'success',
  FAIL = 'fail'
}

const Success = () => {
  const { redirectToUrl } = useRedirect();

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
  }, [countDown]);
  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex flex-col gap-6">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.98 10.6403C41.8624 8.98678 39.9958 7.99724 38 8.00025H10C6.68629 8.00025 4 10.6865 4 14.0003V34.0003C4 37.314 6.68629 40.0003 10 40.0003H38C41.3137 40.0003 44 37.314 44 34.0003V14.0003C44.0027 12.8036 43.6475 11.6335 42.98 10.6403ZM9.99978 12H37.9998C38.5742 12.0007 39.1206 12.2484 39.4998 12.68L23.9998 21.74L8.51978 12.66C8.89789 12.241 9.43542 12.0013 9.99978 12ZM37.9998 36.0005C39.1043 36.0005 39.9998 35.105 39.9998 34.0005V16.9805L25.9998 25.1805C25.3921 25.533 24.7023 25.7192 23.9998 25.7205C23.2991 25.7253 22.6094 25.546 21.9998 25.2005L7.99976 16.9805V34.0005C7.99976 35.105 8.89519 36.0005 9.99976 36.0005H37.9998Z"
            fill="#131313"
          />
        </svg>

        <h3 className="text-h3-m text-neutral-off-black">Password Changed</h3>
        <p className="body-m text-neutral-medium-gray">Your password has been changed successfully</p>
      </div>
      <Button
        onClick={() => {
          setAuthType(AuthType.LOGIN);
          redirectToUrl('/');
        }}
        type="primary"
        block
        className="
        button-text-m border-auth-primary-button-border-color bg-auth-primary-button-bg
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
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.98 10.64C41.8624 8.98653 39.9958 7.997 38 8.00001H10C6.68629 8.00001 4 10.6863 4 14V34C4 37.3137 6.68629 40 10 40H38C41.3137 40 44 37.3137 44 34V14C44.0027 12.8034 43.6475 11.6332 42.98 10.64ZM9.99978 11.9997H37.9998C38.5742 12.0005 39.1206 12.2482 39.4998 12.6797L23.9998 21.7397L8.51978 12.6597C8.89789 12.2408 9.43542 12.0011 9.99978 11.9997ZM37.9998 36.0002C39.1043 36.0002 39.9998 35.1048 39.9998 34.0002V16.9802L25.9998 25.1802C25.3921 25.5327 24.7023 25.719 23.9998 25.7202C23.2991 25.7251 22.6094 25.5457 21.9998 25.2002L7.99976 16.9802V34.0002C7.99976 35.1048 8.89519 36.0002 9.99976 36.0002H37.9998Z"
            fill="#131313"
          />
        </svg>

        <h3 className="text-h3-m text-neutral-off-black">Verification Failed! 😵</h3>
        <p className="body-m  text-neutral-medium-gray">Your token has expired! Please try again.</p>
      </div>
      <Button
        type="primary"
        onClick={() => {
          setAuthType(AuthType.LOGIN);
          redirectToUrl('/');
        }}
        block
        className="
        button-text-m border-auth-primary-button-border-color bg-auth-primary-button-bg
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
          label="Password"
          type="password"
          name="password"
          placeholder="8+ characters with a mix of letters & numbers"
          // description="Use 8 or more characters with a mix of letters & numbers"
          theme="light"
          isMobile
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
          isMobile
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
        button-text-m border-auth-primary-button-border-color bg-auth-primary-button-bg
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
