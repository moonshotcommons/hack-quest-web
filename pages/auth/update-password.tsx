import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/public/images/logo/text-Logo.svg';
import Input from '@/components/Common/Input';
import { FC, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { useValidator } from '@/hooks/useValidator';
import Button, { ButtonProps } from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import webApi from '@/service';
import { useRouter } from 'next/router';
import { ForgetPasswordErrorStatusType } from '@/service/webApi/user/type';
import Link from 'next/link';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/redux/modules/user';
interface ForgetPasswordProps {
  children: React.ReactNode;
}

const CustomButton: FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <Button
      padding="px-[3rem] py-[1.25rem]"
      fontStyle="Inter font-normal font-next-book"
      textStyle="text-[.875rem] text-white leading-[1.25rem]"
      {...props}
    >
      {children}
    </Button>
  );
};

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
        console.log('开始更新');
        debugger;
        if (!errors) {
          const status: any = { ...formState };
          for (let key in status) {
            status[key] = { status: 'success', errorMessage: '' };
          }
          try {
            const res = await webApi.userApi.updatePassword(formData);
            dispatch(setUserInfo(res));
            router.push('/courses');
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
    <div className="w-full h-full min-h-screen flex justify-end items-center">
      <div className="py-[19.78rem] px-[7.5rem] text-left">
        <div className="flex flex-col gap-8">
          <h1 className="text-[#F8F8F8] text-[1.75rem] font-Sofia-Pro-Light-Az font-semibold leading-[150%]">
            Set your new password
          </h1>
        </div>
        <div className="mt-[2rem] flex flex-col gap-[2rem]">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            description="Use 8 or more characters with a mix of letters & numbers"
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
            placeholder="Password"
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
          <div className="mt-[2rem] flex flex-col gap-[0.75rem]">
            <CustomButton block onClick={onUpdate}>
              <div className="flex items-center gap-[1.25rem]">
                <span className="text-[1.25rem] font-next-book text-white leading-[118.5%] font-normal">
                  Save changes
                </span>
                <span>
                  <RightArrowIcon></RightArrowIcon>
                </span>
              </div>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
