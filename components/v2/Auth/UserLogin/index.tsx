import { FC, useRef, useState } from 'react';

import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Checkbox from '@/components/v2/Common/Checkbox';
import Input from '@/components/v2/Common/Input';
import { setToken } from '@/helper/user-token';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { LoginParamsType } from '@/service/webApi/user/type';
import {
  UnLoginType,
  setUnLoginType,
  setUserInfo
} from '@/store/redux/modules/user';
import { useDebounceFn, useKeyPress } from 'ahooks';
import { message } from 'antd';
import { omit } from 'lodash-es';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

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
  const router = useRouter();
  const { redirect_url } = router.query;
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
              : '/home';
            router.push(toPageUrl);
          } catch (e: any) {
            console.log(e);
            // if (e.code === 400) {
            if (e.status === 'UNACTIVATED') {
              setTimeout(() => {
                console.log('跳转2');
                dispatch(setUnLoginType(UnLoginType.EMAIL_VERIFY));
              }, 1000);
            }
            message.error(e?.msg);
            passwordInputRef.current?.setStatus?.('error');
            passwordInputRef.current?.setErrorMessage?.(e.msg);
            // }
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
    <div className="w-full h-full flex flex-col items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex flex-col gap-[25px] w-full">
        <div>
          <p className="text-[#FFF] text-[21px] font-next-poster leading-[160%] tracking-[1.26px]">
            {`Don’t have an account? `}
            <span
              className="underline cursor-pointer"
              onClick={() => {
                dispatch(setUnLoginType(UnLoginType.SIGN_UP));
              }}
            >
              Create a account
            </span>
            <br />
            It takes less than a minute.
          </p>
        </div>

        <div className="text-white">
          <Input
            ref={passwordInputRef}
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            className="bg-[#212121] text-white"
            state={formState.password.status as any}
            errorMessage={formState.password.errorMessage}
            delay={500}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value
              });
            }}
          ></Input>
        </div>
        <div
          className="w-full underline text-white font-next-book text-[1.125rem] leading-[160%] tracking-[0.36px] text-center cursor-pointer"
          onClick={() => {
            dispatch(
              setUnLoginType({
                type: UnLoginType.FORGOT_PASSWORD,
                params: { email }
              })
            );
          }}
        >
          Forgot Password?
        </div>
        <div className="flex gap-[.75rem]">
          <Checkbox
            outClassNames={`${
              formData.keepMeLoggedIn ? 'border-[#FFD850]' : 'border-[#8C8C8C]'
            }`}
            innerClassNames="bg-[#FFD850]"
            onChange={(value) => {
              setFormData({
                ...formData,
                keepMeLoggedIn: value
              });
            }}
            isCircle={true}
          ></Checkbox>
          <p className="text-white text-[1rem] font-next-book tracking-[-0.011rem]">
            Keep me logged in
          </p>
        </div>

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
          bg-transparent
          text-white hover:text-auth-ghost-button-text-hover-color
          border-white hover:border-auth-ghost-button-border-hover-color
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
