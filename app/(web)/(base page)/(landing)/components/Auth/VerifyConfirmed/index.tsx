import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import webApi from '@/service';

import { omit } from 'lodash-es';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Google from '@/public/images/login/google.svg';
import Github from '@/public/images/login/github.svg';
import Image from 'next/image';
import { ThirdPartyAuthType } from '@/service/webApi/user/type';
import TipsModal from '@/app/(web)/(base page)/(landing)/components/TipsModal';
import useIsPc from '@/hooks/useIsPc';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
enum VerifyStateType {
  VERIFYING = 'verifying',
  SUCCESS = 'success',
  FAIL = 'fail'
}

interface VerifyConfirmedProps {}

const Verifying: React.FC<{ type: ThirdPartyAuthType }> = ({ type }) => {
  return (
    <div className="text-center flex flex-col items-center gap-[25px]">
      <h1 className="text-white text-[1.75rem] font-next-book-bold font-bold leading-[125%] -tracking-[0.01924rem]">
        Verifying...
      </h1>
      <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
        <span>Please wait... We are verifying your {type}...</span>
      </div>
    </div>
  );
};
const Success: React.FC<{ type: ThirdPartyAuthType }> = ({ type }) => {
  const { redirectToUrl } = useRedirect();

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
      redirectToUrl('/dashboard');
    }
  }, [countDown]);

  return (
    <div className="flex flex-col gap-[25px]">
      <h1 className="text-white text-[32px] font-next-book-bold font-bold leading-[125%] -tracking-[0.64px] flex items-center">
        Email Verified! 🎉
      </h1>
      <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
        <span>
          You have been successfully verified the {type}! You will be redirected
          in 5 second.
        </span>
      </div>
      {/* <Button
        // onClick={onLogin}
        block
        className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
      >
        {`Continue to Homepage (${countDown}s)`}
      </Button> */}
    </div>
  );
};

const Fail: React.FC<{ type: ThirdPartyAuthType }> = ({ type }) => {
  const loginThreeParty = async (type: ThirdPartyAuthType) => {
    const res = (await webApi.userApi.getAuthUrl(type)) as any;
    window.location.href = res?.url;
  };

  const { redirectToUrl } = useRedirect();
  const { setAuthType } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType
    }))
  );
  const renderTextAndBtn = () => {
    switch (type) {
      case ThirdPartyAuthType.EMAIL:
        return (
          <>
            <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
              <span>
                Your verification has failed!
                <br />
                Please verify your Email again.
              </span>
            </div>
            <Button
              onClick={() => {
                redirectToUrl('/');
                setAuthType(AuthType.LOGIN);
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
              try login
            </Button>
          </>
        );
      default:
        return (
          <>
            <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
              <span>
                Your {type} account verification has failed!
                <br />
                Please try again.
              </span>
            </div>
            <Button
              block
              className=" font-next-book
              text-[1.125rem]
              bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
              text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
              border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color relative"
              onClick={() => loginThreeParty(type)}
            >
              <Image
                src={type === ThirdPartyAuthType.GOOGLE ? Google : Github}
                width={22}
                height={22}
                alt={type}
                className="absolute left-[25px] top-[16px]"
              ></Image>
              Continue with {type}
            </Button>
            <Button
              onClick={() => {
                redirectToUrl('/');
                setAuthType(AuthType.LOGIN);
              }}
              block
              className="font-next-book text-[1.125rem] text-[#fff] border border-[#fff]"
            >
              Back
            </Button>
          </>
        );
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-white text-[1.75rem] font-next-book-bold font-bold leading-[125%] -tracking-[0.64px]">
        Verification Failed! 😵
      </h1>
      {renderTextAndBtn()}
    </div>
  );
};

const VerifyConfirmed: FC<VerifyConfirmedProps> = (props) => {
  const { redirectToUrl } = useRedirect();
  const { setUserInfo, setAuthType } = useUserStore(
    useShallow((state) => ({
      setUserInfo: state.setUserInfo,
      setAuthType: state.setAuthType
    }))
  );
  const isPc = useIsPc();
  const [tipsOpen, setTipsOpen] = useState(false);
  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const query = useSearchParams();
  const router = useRouter();
  const [verifyState, setVerifyState] = useState(VerifyStateType.VERIFYING);
  const [source, setSource] = useState<ThirdPartyAuthType>(
    ThirdPartyAuthType.EMAIL
  );
  const verifyEmail = (token: string) => {
    BurialPoint.track('signup-注册邮箱token验证');
    if (token) {
      webApi.userApi
        .tokenVerify({ token: token as string })
        .then((res: any) => {
          BurialPoint.track('signup-注册邮箱token验证成功');
          if (isPc()) {
            setUserInfo(omit(res, 'token'));
            setToken(res.token || token);
            setVerifyState(VerifyStateType.SUCCESS);
          } else {
            setTipsOpen(true);
          }
        })
        .catch((err) => {
          BurialPoint.track('signup-注册邮箱token验证失败', {
            message: err?.msg || err?.message || ''
          });
          setVerifyState(VerifyStateType.FAIL);
          console.log(err);
        });
    } else {
      BurialPoint.track('signup-注册邮箱token验证失败', {
        message: 'token不存在'
      });
      setVerifyState(VerifyStateType.FAIL);
    }
  };
  const verifyGoogle = (code: string) => {
    BurialPoint.track('signup-Google三方登录code验证');
    if (code) {
      webApi.userApi
        .googleVerify(code)
        .then((res: any) => {
          if (res.status === 'UNACTIVATED') {
            redirectToUrl(`/?type=${AuthType.INVITE_CODE}`, true);

            setAuthType({
              type: AuthType.INVITE_CODE,
              params: {
                registerType: ThirdPartyAuthType.GOOGLE,
                ...res
              }
            });
          } else {
            if (isPc()) {
              setUserInfo(omit(res, 'token'));
              setToken(res.token);
              redirectToUrl('/dashboard');
            } else {
              setTipsOpen(true);
            }
          }
        })
        .catch((err) => {
          BurialPoint.track('signup-Google三方登录code验证失败', {
            message: err?.msg || err?.message || ''
          });
          setVerifyState(VerifyStateType.FAIL);
          console.log(err);
        });
    } else {
      BurialPoint.track('signup-Google三方登录code验证失败', {
        message: 'code不存在'
      });
      setVerifyState(VerifyStateType.FAIL);
    }
  };

  const verifyGithub = (code: string) => {
    BurialPoint.track('signup-Github三方登录code验证');

    if (code) {
      webApi.userApi
        .githubVerify(code)
        .then((res: any) => {
          if (res.status === 'UNACTIVATED') {
            redirectToUrl(`/?type=${AuthType.INVITE_CODE}`, true);
            setAuthType({
              type: AuthType.INVITE_CODE,
              params: {
                registerType: ThirdPartyAuthType.GITHUB,
                ...res
              }
            });
          } else {
            if (isPc()) {
              BurialPoint.track('signup-Github三方登录code验证成功');
              setUserInfo(omit(res, 'token'));
              setToken(res.token);
              redirectToUrl('/dashboard');
            } else {
              setTipsOpen(true);
            }
          }
        })
        .catch((err) => {
          BurialPoint.track('signup-Github三方登录code验证失败', {
            message: err?.msg || err?.message || ''
          });
          setVerifyState(VerifyStateType.FAIL);
          console.log(err);
        });
    } else {
      BurialPoint.track('signup-Github三方登录code验证失败', {
        message: 'code不存在'
      });
      setVerifyState(VerifyStateType.FAIL);
    }
  };
  useEffect(() => {
    // const { token, state } = query;
    const token = query.get('token');
    const state = query.get('state');
    let code = query.get('code');
    let querySource = query.get('source') || ThirdPartyAuthType.EMAIL;
    if (state) {
      const verifyData = JSON.parse(atob(state as string));
      querySource = verifyData?.source || ThirdPartyAuthType.GOOGLE;
    }
    //第一个字母大写 其余小写
    querySource = (querySource as string)
      .toLocaleLowerCase()
      .replace(/^\w/, (s) => s.toLocaleUpperCase());
    setSource(querySource as ThirdPartyAuthType);
    switch (querySource) {
      case ThirdPartyAuthType.GOOGLE:
        verifyGoogle(code as string);
        break;
      case ThirdPartyAuthType.GITHUB:
        verifyGithub(code as string);
        break;
      default:
        verifyEmail(token as string);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {verifyState === VerifyStateType.VERIFYING && (
        <Verifying type={source}></Verifying>
      )}
      {verifyState === VerifyStateType.SUCCESS && (
        <Success type={source}></Success>
      )}
      {verifyState === VerifyStateType.FAIL && <Fail type={source}></Fail>}
      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </div>
  );
};

export default VerifyConfirmed;
