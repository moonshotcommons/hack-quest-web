import { FC, useContext, useEffect, useRef, useState } from 'react';

import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Checkbox from '@/components/Mantle/Common/Checkbox';
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
            if (!redirect_url && !isLandingPage) window.location.reload();
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
    <div className="flex h-full w-full flex-col justify-between px-5">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[20px] text-base">
        <div>
          <p className="text-center font-GT-Walsheim-Trial text-[1rem] leading-[140%] text-[#C4C4C4]">
            {`Don't have an account? `}
            <span
              className="body-l-bold cursor-pointer underline"
              onClick={() => {
                setAuthType(AuthType.SIGN_UP);
              }}
            >
              Sign up
            </span>
          </p>
        </div>

        <div>
          <Input
            ref={passwordInputRef}
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            theme="dark"
            source="mantle"
            isMobile
            state={formState.password.status as any}
            errorMessage={formState.password.errorMessage}
            delay={500}
            rightLabel={
              <div
                className="underline-m cursor-pointer text-[.875rem] text-neutral-off-white"
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

        <div className="flex items-center gap-[.75rem]" onClick={(e) => {}}>
          <Checkbox
            outClassNames={`${
              formData.keepMeLoggedIn
                ? 'border-neutral-off-white'
                : 'border-neutral-medium-gray'
            }`}
            innerClassNames="bg-neutral-off-white"
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
              'body-s cursor-pointer text-neutral-medium-gray',
              formData.keepMeLoggedIn ? 'text-neutral-off-white' : ''
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
      <div className="flex w-full flex-col gap-4">
        <Button
          onClick={onLogin}
          block
          loading={loading}
          disabled={loading}
          icon={<RightArrowIcon></RightArrowIcon>}
          iconPosition="right"
          type="mantle"
          className="gap-[15px] rounded-[10px] font-GT-Walsheim-Trial text-[18px] leading-[140%]"
        >
          Continue
        </Button>
        <Button
          onClick={onBack}
          block
          ghost
          className="
          gap-[15px] rounded-[10px] border-white font-GT-Walsheim-Trial text-[18px] leading-[140%] text-white
          "
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default UserLogin;
