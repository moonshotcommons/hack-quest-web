import { FC, useEffect, useRef, useState } from 'react';

import Button from '@/components/v2/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Checkbox from '@/components/v2/Common/Checkbox';
import Input from '@/components/v2/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
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
import useIsPc from '@/hooks/useIsPc';
import TipsModal from '../../Landing/components/TipsModal';

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
  const isPc = useIsPc();
  const [tipsOpen, setTipsOpen] = useState(false);
  const { validator } = useValidator(['email', 'password']);
  const router = useRouter();
  const { redirect_url } = router.query;
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
            if (isPc()) {
              dispatch(setUserInfo(omit(res, 'token')));
              setToken(res.token);
              if (redirect_url) {
                BurialPoint.track('login-redirect跳转');
              }
              const toPageUrl = redirect_url
                ? `${redirect_url}?token=${res.token}`
                : '/home';

              router.push(toPageUrl);
            } else {
              setTipsOpen(true);
            }
          } catch (e: any) {
            if (e.code === 400) {
              BurialPoint.track('login-登录失败', { message: e?.msg });
              if (e.status === 'UNACTIVATED') {
                setTimeout(() => {
                  dispatch(setUnLoginType(UnLoginType.EMAIL_VERIFY));
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
            BurialPoint.track('login-忘记密码');
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
        <div className="flex gap-[.75rem] items-center" onClick={(e) => {}}>
          <Checkbox
            outClassNames={`${
              formData.keepMeLoggedIn ? 'border-[#FFD850]' : 'border-[#8C8C8C]'
            }`}
            innerClassNames="bg-[#FFD850]"
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
            className="text-white text-[1rem] font-next-book tracking-[-0.011rem] cursor-pointer"
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

        <Button
          onClick={onLogin}
          block
          loading={loading}
          disabled={loading}
          icon={<RightArrowIcon></RightArrowIcon>}
          iconPosition="right"
          type="primary"
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

      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </div>
  );
};

export default UserLogin;
