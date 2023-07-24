import { FC, ReactNode, useRef, useState } from 'react';

import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { cn } from '@/helper/utils';
import { useValidator } from '@/hooks/useValidator';
import { Radio, message } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import webApi from '@/service';
import { LoginParamsType } from '@/service/webApi/user/type';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/redux/modules/user';
import { useRouter } from 'next/router';
import { useDebounceFn } from 'ahooks';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';

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

interface UserLoginProps {
  // children: ReactNode;
  email: string;
}

const UserLogin: FC<UserLoginProps> = (props) => {
  const { email } = props;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginParamsType>({
    email: email,
    password: '',
    keepMeLoggedIn: false
  });

  const [formState, setFormState] = useState({
    email: {
      status: 'default',
      errorMessage: ''
    },
    password: {
      status: 'default',
      errorMessage: ''
    }
  });

  const { validator } = useValidator(['email', 'password']);
  const router = useRouter();
  const passwordInputRef = useRef<any>(null);

  const { run: onLogin } = useDebounceFn(
    () => {
      validator.validate(formData, async (errors, fields) => {
        if (!errors) {
          try {
            const res = (await webApi.userApi.userLogin(formData)) as any;
            const status: any = { ...formState };
            for (let key in status) {
              status[key] = { status: 'success', errorMessage: '' };
            }
            dispatch(setUserInfo(omit(res, 'token')));
            setToken(res.token);
            router.push('/courses');
          } catch (e: any) {
            if (e.code === 400) {
              // setTimeout(() => {
              //   router.push('/auth/email-verify');
              // }, 1000);
              if (e.status === 'UNACTIVATED') {
                setTimeout(() => {
                  router.push('/auth/email-verify');
                }, 200);
              }
              passwordInputRef.current?.setStatus?.('error');
              passwordInputRef.current?.setErrorMessage?.(e.msg);
            }
          }
        } else {
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
    <div className="px-[6.875rem] py-[11.3125rem] h-full flex flex-col justify-center items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex flex-col gap-[2rem]">
        <p className="text-[#F8F8F8] text-[1.75rem] font-Sofia-Pro-Light-Az font-semibold leading-[150%]">
          Welcome
        </p>

        <Input
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          state={formState.email.status as any}
          errorMessage={formState.email.errorMessage}
          defaultValue={email}
          delay={500}
          rules={{
            type: 'string',
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Incorrect Email'
          }}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value
            });
          }}
        ></Input>
        <Input
          ref={passwordInputRef}
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          state={formState.password.status as any}
          errorMessage={formState.password.errorMessage}
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
              password: e.target.value
            });
          }}
        ></Input>
        <div className="flex gap-[.75rem]">
          <Checkbox
            onChange={(value) => {
              setFormData({
                ...formData,
                keepMeLoggedIn: value
              });
            }}
          ></Checkbox>
          <p className="text-[#676767] text-[1rem] font-Sofia-Pro-Light-Az tracking-[-0.011rem]">
            Keep me logged in
          </p>
        </div>
        <CustomButton onClick={onLogin} block>
          <div className="flex items-center gap-[1.25rem]">
            <span className="text-[1.25rem] font-next-book text-white leading-[118.5%]">
              Log in now
            </span>
            <span>
              <RightArrowIcon></RightArrowIcon>
            </span>
          </div>
        </CustomButton>

        <Link href={'/auth/forget-password'} className="w-full text-right">
          <span className="text-[#676767] font-Sofia-Pro-Light-Az text-[1rem] leading-[150%] tracking-[-0.011rem] text-right">
            Forgot your password？
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
