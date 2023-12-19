import { FC, useRef, useState } from 'react';

import Button from '@/components/v2/Common/Button';
import Checkbox from '@/components/v2/Common/Checkbox';
import RightArrowIcon from '@/components/v2/Common/Icon/RightArrow';
import Input from '@/components/v2/Common/Input';
import { useValidator } from '@/hooks/useValidator';
import { message } from 'antd';
import Link from 'next/link';
import webApi from '@/service';
import { LoginParamsType } from '@/service/webApi/user/type';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/redux/modules/user';
import { useDebounceFn, useKeyPress } from 'ahooks';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';
import { useParams } from 'next/navigation';
import { useRedirect } from '@/hooks/useRedirect';

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

interface UserLoginProps {
  // children: ReactNode;
  email: string;
  onBack: VoidFunction;
}

const UserLogin: FC<UserLoginProps> = (props) => {
  const { email, onBack } = props;

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
  const { redirectToUrl } = useRedirect();
  const { redirect_url } = useParams();
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
            const toPageUrl = redirect_url
              ? `${redirect_url}?token=${res.token}`
              : '/courses';
            redirectToUrl(toPageUrl);
          } catch (e: any) {
            if (e.code === 400) {
              // setTimeout(() => {
              //   redirectToUrl('/auth/email-verify');
              // }, 1000);
              if (e.status === 'UNACTIVATED') {
                setTimeout(() => {
                  redirectToUrl(`/auth/email-verify?email=${email}`);
                }, 200);
              }
              message.error(e?.msg);
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

  useKeyPress('enter', onLogin);

  return (
    <div className="pt-[8rem] w-full h-full flex flex-col justify-center items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex flex-col gap-[1.75rem] w-full">
        <p className="text-text-default-color text-[2rem] font-next-book font-semibold leading-[150%]">
          Welcome to HACKQUEST
        </p>
        <p className="text-text-default-color text-[1.125rem] font-next-book leading-[125%] tracking-[.0225rem]]">
          {`Don’t have an account? `}
          <Link href={'/auth/register'} className="underline">
            Create a account
          </Link>
          <br />
          It takes less than a minute.
        </p>
        {/*
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
        ></Input> */}
        <Input
          ref={passwordInputRef}
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          state={formState.password.status as any}
          errorMessage={formState.password.errorMessage}
          delay={500}
          // rules={{
          //   type: 'string',
          //   required: true,
          //   pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
          //   message: 'Incorrect Password'
          // }}
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
          <p className="text-auth-description-text-color text-[1rem] font-next-book tracking-[-0.011rem]">
            Keep me logged in
          </p>
        </div>
        <Link
          href={'/auth/forget-password'}
          className="w-full text-center underline"
        >
          <span className="text-auth-description-text-color font-next-book text-[1.125rem] leading-[150%] tracking-[-0.011rem] text-center">
            Forgot Password?
          </span>
        </Link>
        <div className="flex flex-col gap-[.625rem]">
          <Button
            onClick={onLogin}
            block
            icon={<RightArrowIcon></RightArrowIcon>}
            iconPosition="right"
            className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
          >
            Login now
          </Button>
          <Button
            onClick={onBack}
            block
            className="
          font-next-book
          text-[1.125rem]
          border
          bg-auth-ghost-button-bg hover:bg-auth-ghost-button-hover-bg
          text-auth-ghost-button-text-color hover:text-auth-ghost-button-text-hover-color
          border-auth-ghost-button-border-color hover:border-auth-ghost-button-border-hover-color
          "
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
