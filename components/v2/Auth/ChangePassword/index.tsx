import Button from '@/components/Common/Button';
import Input from '@/components/v2/Common/Input';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useDebounceFn } from 'ahooks';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
interface ChangePasswordProps {}

enum ChangeStateType {
  CHANGE = 'change',
  SUCCESS = 'success',
  FAIL = 'fail'
}

const Success = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else {
      dispatch(setUnLoginType(UnLoginType.LOGIN));
      router.push('/');
    }
  }, [countDown, router]);
  return (
    <div className="flex flex-col gap-[25px]">
      <h1 className="text-white text-[32px] font-next-book-bold font-bold leading-[125%] -tracking-[0.64px] flex items-center">
        Password Changed! 🎉
      </h1>
      <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
        <span>Your password has been changed successfully.</span>
      </div>
      <Button
        onClick={() => {
          dispatch(setUnLoginType(UnLoginType.LOGIN));
          router.push('/');
        }}
        block
        className="
      font-next-book
      text-[1.125rem]
      bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
      text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
      border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
      "
      >
        {`Back to Log in (${countDown}s)`}
      </Button>
    </div>
  );
};
const Fail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-white text-[1.75rem] font-next-book-bold font-bold leading-[125%] -tracking-[0.64px]">
        Verification Failed! 😵
      </h1>
      <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
        <span>Your token has expired! Please try again.</span>
      </div>
      <Button
        onClick={() => {
          dispatch(setUnLoginType(UnLoginType.LOGIN));
          router.push('/');
        }}
        block
        className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
      >
        Back to Log in
      </Button>
    </div>
  );
};

const ChangeForm = ({
  changeState
}: {
  changeState: (state: ChangeStateType) => void;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = router.query;
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

  const { run: onUpdate } = useDebounceFn(
    () => {
      validator.validate(formData, async (errors, fields) => {
        if (!errors) {
          const status: any = { ...formState };
          for (let key in status) {
            status[key] = { status: 'success', errorMessage: '' };
          }
          try {
            const res = (await webApi.userApi.updatePassword(formData)) as any;
            changeState(ChangeStateType.SUCCESS);
          } catch (e: any) {
            message.error(e.msg);
            changeState(ChangeStateType.FAIL);
          }
        } else {
          console.log('产生错误', errors, fields);
          const status: any = { ...formState };
          errors.map((error) => {
            status[error.field as string] = {
              status: 'error',
              errorMessage: error.message
            };
          });
          setFormState(status);
        }
      });
    },
    { wait: 500 }
  );

  return (
    <div className="h-full w-full flex flex-col items-center gap-[25px]">
      <h1 className="text-white text-[32px] font-next-book  leading-[150%] w-full">
        Set your new password
      </h1>

      <div className="text-white w-full">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="8+ characters with a mix of letters & numbers"
          // description="Use 8 or more characters with a mix of letters & numbers"
          className="bg-[#212121] text-white"
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
      </div>
      <div className="text-white w-full">
        <Input
          label="Re-enter password"
          type="password"
          placeholder="Confirm your password"
          name="reenterPassword"
          className="bg-[#212121] text-white"
          state={formState.reenterPassword.status as any}
          errorMessage={formState.reenterPassword.errorMessage}
          delay={500}
          rules={[
            {
              type: 'string',
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
              message:
                'Use 8 or more characters with a mix of letters & numbers'
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
        className="
              font-next-book
              text-[1.125rem]
              bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
              text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
              border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
              "
      >
        Confirm
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
