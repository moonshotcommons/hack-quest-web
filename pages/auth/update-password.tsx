import { NextPage } from 'next';
import Input from '@/components/Common/Input';
import { useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { useValidator } from '@/hooks/useValidator';
import Button from '@/components/Common/Button';
import webApi from '@/service';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
interface ForgetPasswordProps {
  children: React.ReactNode;
}

// const CustomButton: FC<ButtonProps> = (props) => {
//   const { children } = props;
//   return (
//     <Button
//       padding="px-[3rem] py-[1.25rem]"
//       fontStyle="Inter font-normal font-next-book"
//       textStyle="text-[.875rem] text-white leading-[1.25rem]"
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };

const ForgetPassword: NextPage<ForgetPasswordProps> = (props) => {
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
            // dispatch(setUserInfo(omit(res, 'token')));
            // setToken(res.token);
            router.push('/auth/login');
          } catch (e: any) {
            message.error(e.msg);
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
    <div className="h-full w-full max-w-[33.0625rem] flex flex-col justify-center items-center">
      <div className="pt-[8rem] w-full text-left">
        <div className="flex w-full flex-col gap-8">
          <h1 className="text-text-default-color text-[1.75rem] font-next-book  leading-[150%]">
            Set your new password
          </h1>
        </div>
        <div className="mt-[2rem] w-full flex flex-col gap-[2rem]">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="8+ characters with a mix of letters & numbers"
            // description="Use 8 or more characters with a mix of letters & numbers"
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
            name="reenterPassword"
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
          <div className="flex flex-col gap-[0.75rem]">
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
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
