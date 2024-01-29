import { FC, useContext, useEffect, useRef, useState } from 'react';

import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Checkbox from '@/components/Common/Checkbox';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { LoginParamsType } from '@/service/webApi/user/type';
import { useDebounceFn, useKeyPress } from 'ahooks';
import { message } from 'antd';
import { omit } from 'lodash-es';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/helper/utils';
import { useRouter } from 'next/navigation';
import { AuthContext } from '..';
import { useCheckPathname, useCustomPathname } from '@/hooks/useCheckPathname';

interface UserLoginProps {
  // children: ReactNode;
  email: string;
  onBack: VoidFunction;
}

const UserLogin: FC<UserLoginProps> = (props) => {
  const { email, onBack } = props;
  const { setAuthType, setUserInfo } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      setUserInfo: state.setUserInfo
    }))
  );

  const { changeNavState } = useContext(AuthContext);

  const pathname = useCustomPathname();
  const { isLandingPage } = useCheckPathname();
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

  const [tipsOpen, setTipsOpen] = useState(false);
  const { validator } = useValidator(['email', 'password']);
  // const { validator: emailValidator } = useValidator(['email']);
  const router = useRouter();
  const { redirectToUrl } = useRedirect();
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const passwordInputRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const { run: onLogin } = useDebounceFn(
    () => {
      setLoading(true);
      BurialPoint.track('login-登录按钮点击');
      validator.validate(formData, async (errors, fields) => {
        if (!errors) {
          try {
            const res = (await webApi.userApi.userLogin(formData)) as any;
            const status: any = { ...formState };
            for (let key in status) {
              status[key] = { status: 'success', errorMessage: '' };
            }
            setLoading(false);
            BurialPoint.track('login-登录成功');

            setUserInfo(omit(res, 'token'));
            setToken(res.token);
            const redirect_url = query.get('redirect_url');
            if (redirect_url) {
              BurialPoint.track('login-redirect跳转');
            }
            const toPageUrl = redirect_url
              ? `${redirect_url}?token=${res.token}`
              : '/dashboard';
            changeNavState();
            if (!redirect_url && !isLandingPage) router.refresh();
            else redirectToUrl(toPageUrl);
          } catch (e: any) {
            if (e.code === 400) {
              BurialPoint.track('login-登录失败', { message: e?.msg });
              if (e.status === 'UNACTIVATED') {
                setTimeout(() => {
                  setAuthType(AuthType.EMAIL_VERIFY);
                }, 1000);
              }
              message.error(e?.msg);
              passwordInputRef.current?.setStatus?.('error');
              passwordInputRef.current?.setErrorMessage?.(e.msg);
            }
            setLoading(false);
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
          setLoading(false);
        }
      });
    },
    { wait: 500 }
  );

  useKeyPress('enter', onLogin);

  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('login-登录输入密码停留时间', { duration });
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex flex-col gap-[24px] w-full text-base">
        <div>
          <p className="body-l-bold text-neutral-rich-gray">
            {`Don’t have an account? `}
            <span
              className="body-l-bold underline cursor-pointer"
              onClick={() => {
                setAuthType(AuthType.SIGN_UP);
              }}
            >
              Sign up
            </span>
          </p>
        </div>
        {/* <div>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            theme="light"
            state={formState.email.status as any}
            clear
            errorMessage={formState.email.errorMessage}
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
              emailValidator.validate(
                { email: e.target.value },
                (errors, fields) => {
                  console.log(errors, fields);
                  if (errors?.[0]) {
                    setFormState({
                      ...formState,
                      email: {
                        status: 'error',
                        errorMessage: errors?.[0].message || ''
                      }
                    });
                  } else {
                    setFormState({
                      ...formState,
                      email: {
                        status: 'success',
                        errorMessage: ''
                      }
                    });
                  }
                }
              );
            }}
            defaultValue={formData.email}
          ></Input>
        </div> */}

        <div>
          <Input
            ref={passwordInputRef}
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            theme="light"
            isMobile
            state={formState.password.status as any}
            errorMessage={formState.password.errorMessage}
            delay={500}
            rightLabel={
              <div
                className="underline-m text-neutral-off-black cursor-pointer text-[.875rem]"
                onClick={() => {
                  BurialPoint.track('login-忘记密码');
                  setAuthType({
                    type: AuthType.FORGOT_PASSWORD,
                    params: { email: formData.email }
                  });
                }}
              >
                Forgot Password?
              </div>
            }
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value
              });
            }}
          ></Input>
        </div>

        <div className="flex gap-[.75rem] items-center" onClick={(e) => {}}>
          <Checkbox
            outClassNames={`${
              formData.keepMeLoggedIn
                ? 'border-neutral-off-black'
                : 'border-neutral-medium-gray'
            }`}
            innerClassNames="bg-neutral-off-black"
            checked={formData.keepMeLoggedIn}
            onChange={(value) => {
              BurialPoint.track('login-保存登录状态');
              setFormData({
                ...formData,
                keepMeLoggedIn: value
              });
            }}
            isCircle={true}
          ></Checkbox>
          <p
            className={cn(
              'body-s text-neutral-medium-gray cursor-pointer',
              formData.keepMeLoggedIn ? 'text-neutral-off-black' : ''
            )}
            onClick={() => {
              setFormData({
                ...formData,
                keepMeLoggedIn: !formData.keepMeLoggedIn
              });
            }}
          >
            Keep me logged in
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <Button
          onClick={onLogin}
          block
          loading={loading}
          disabled={loading}
          icon={<RightArrowIcon></RightArrowIcon>}
          iconPosition="right"
          type="primary"
          className="
          py-4 uppercase button-text-l text-[.875rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
        >
          Continue
        </Button>
        <Button
          onClick={onBack}
          block
          ghost
          className="
          py-4 uppercase button-text-l border-neutral-off-black text-[.875rem]
          "
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default UserLogin;
