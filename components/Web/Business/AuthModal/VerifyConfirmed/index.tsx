import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import webApi from '@/service';

import { omit } from 'lodash-es';
import { useRouter } from 'next-nprogress-bar';
import { FC, useEffect, useState } from 'react';
import Google from '@/public/images/login/google.svg';
import Github from '@/public/images/login/github.svg';
import Image from 'next/image';
import { LoginResponse, ThirdPartyAuthType } from '@/service/webApi/user/type';
import { useRedirect } from '@/hooks/router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useGlobalStore } from '@/store/zustand/globalStore';
enum VerifyStateType {
  VERIFYING = 'verifying',
  SUCCESS = 'success',
  FAIL = 'fail'
}

interface VerifyConfirmedProps {}

const Verifying: React.FC<{ type: ThirdPartyAuthType }> = ({ type }) => {
  return (
    <div className="flex h-[18.5rem] flex-col justify-center gap-8 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // style="margin: auto; background: #f1f2f3; display: block; shape-rendering: auto;"
        // className="m-auto block"
        // width="224px"
        // height="224px"
        className="h-[40px] w-[224px]"
        viewBox="0 40 100 20"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(20 50)">
          <circle cx="0" cy="0" r="3" fill="#d8dddf">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.5434782608695652s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1.4492753623188404s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(40 50)">
          <circle cx="0" cy="0" r="3" fill="#b8babd">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.3623188405797101s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1.4492753623188404s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(60 50)">
          <circle cx="0" cy="0" r="3" fill="#a3a3ac">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.18115942028985504s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1.4492753623188404s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(80 50)">
          <circle cx="0" cy="0" r="3" fill="#727a7e">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="0s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1.4492753623188404s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
      </svg>
      <p className="body-xl">Verifying Email...</p>
    </div>
  );
};
const Success: React.FC<{ type: ThirdPartyAuthType }> = ({ type }) => {
  const { redirectToUrl } = useRedirect();
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
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
      setAuthModalOpen(false);
      redirectToUrl('/welcome');
    }
  }, [countDown]);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-6">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.3063 14.187C55.8162 11.9824 53.3273 10.663 50.6663 10.667H13.333C8.91473 10.667 5.33301 14.2487 5.33301 18.667V45.3337C5.33301 49.7519 8.91473 53.3337 13.333 53.3337H50.6663C55.0846 53.3337 58.6663 49.7519 58.6663 45.3337V18.667C58.6699 17.0715 58.1963 15.5113 57.3063 14.187ZM13.3327 16H50.666C51.432 16.001 52.1605 16.3312 52.666 16.9067L31.9994 28.9867L11.3594 16.88C11.8635 16.3214 12.5802 16.0018 13.3327 16ZM50.666 48.0006C52.1388 48.0006 53.3327 46.8067 53.3327 45.334V22.6406L34.666 33.5739C33.8558 34.044 32.936 34.2923 31.9993 34.2939C31.0651 34.3004 30.1455 34.0613 29.3327 33.6006L10.666 22.6406V45.334C10.666 46.8067 11.8599 48.0006 13.3327 48.0006H50.666Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h3 text-neutral-off-black"> Email Verified! 🎉</h1>
        <p className="body-l text-neutral-medium-gray">
          You have been successfully verified the email! You will be directed to homepage in 5 seconds.
        </p>
      </div>
      <div className="mt-[4rem] flex w-full flex-col gap-4">
        <Button
          onClick={() => {}}
          block
          className={`
          button-text-l border-auth-primary-button-border-color bg-auth-primary-button-bg
          py-4 uppercase
          text-auth-primary-button-text-color hover:border-auth-primary-button-border-hover-color
          hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color
          `}
        >
          {`Continue to Homepage (${countDown}s)`}
        </Button>
      </div>
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
            <Button
              onClick={() => {
                setAuthType(AuthType.LOGIN);
                redirectToUrl('/');
              }}
              block
              className="
              button-text-l border-auth-primary-button-border-color bg-auth-primary-button-bg
          py-4 uppercase
          text-auth-primary-button-text-color hover:border-auth-primary-button-border-hover-color
          hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color
          "
            >
              try login
            </Button>
          </>
        );
      default:
        return (
          <>
            <div className="flex flex-col gap-4">
              <Button
                block
                className=" button-text-l relative border-auth-primary-button-border-color
              bg-auth-primary-button-bg py-4
              uppercase text-auth-primary-button-text-color
              hover:border-auth-primary-button-border-hover-color hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color"
                onClick={() => loginThreeParty(type)}
                icon={
                  <Image
                    src={type === ThirdPartyAuthType.GOOGLE ? Google : Github}
                    width={22}
                    height={22}
                    alt={type}
                  ></Image>
                }
              >
                Continue with {type}
              </Button>
              <Button
                ghost
                onClick={() => {
                  setAuthType(AuthType.LOGIN);
                  redirectToUrl('/');
                }}
                block
                className="button-text-l border-neutral-off-black py-4 uppercase"
              >
                Back
              </Button>
            </div>
          </>
        );
    }
  };
  return (
    <div className="flex h-full w-full flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.3063 14.187C55.8162 11.9824 53.3273 10.663 50.6663 10.667H13.333C8.91473 10.667 5.33301 14.2487 5.33301 18.667V45.3337C5.33301 49.7519 8.91473 53.3337 13.333 53.3337H50.6663C55.0846 53.3337 58.6663 49.7519 58.6663 45.3337V18.667C58.6699 17.0715 58.1963 15.5113 57.3063 14.187ZM13.3327 16H50.666C51.432 16.001 52.1605 16.3312 52.666 16.9067L31.9994 28.9867L11.3594 16.88C11.8635 16.3214 12.5802 16.0018 13.3327 16ZM50.666 48.0006C52.1388 48.0006 53.3327 46.8067 53.3327 45.334V22.6406L34.666 33.5739C33.8558 34.044 32.936 34.2923 31.9993 34.2939C31.0651 34.3004 30.1455 34.0613 29.3327 33.6006L10.666 22.6406V45.334C10.666 46.8067 11.8599 48.0006 13.3327 48.0006H50.666Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h3 text-neutral-off-black">Verification Failed! 😵</h1>
        <p className="body-l text-neutral-medium-gray">Your verification has failed! Please verify your Email again.</p>
      </div>
      {renderTextAndBtn()}
    </div>
  );
};

const VerifyConfirmed: FC<VerifyConfirmedProps> = (props) => {
  const { redirectToUrl } = useRedirect();
  const { setUserInfo, setAuthType, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      setUserInfo: state.setUserInfo,
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen
    }))
  );

  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);
  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const router = useRouter();
  const [verifyState, setVerifyState] = useState(VerifyStateType.VERIFYING);
  const [source, setSource] = useState<ThirdPartyAuthType>(ThirdPartyAuthType.EMAIL);
  const verifyEmail = (token: string) => {
    BurialPoint.track('signup-注册邮箱token验证');
    if (token) {
      webApi.userApi
        .tokenVerify({ token: token as string })
        .then((res: any) => {
          BurialPoint.track('signup-注册邮箱token验证成功');

          setUserInfo(omit(res, 'token'));
          setToken(res.token || token);
          setAuthModalOpen(false);
          setVerifyState(VerifyStateType.SUCCESS);
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

  const { run: skipInviteCode, loading: skipInviteCodeLoading } = useRequest(
    async (token: string) => {
      const res = await webApi.userApi.activateUser(token);
      return res;
    },
    {
      onSuccess(res: any) {
        setUserInfo(omit(res, 'token') as Omit<LoginResponse, 'token'>);
        BurialPoint.track('signup-Google三方登录输入邀请码登录成功');
        setToken(res.token);
        setAuthModalOpen(false);
        redirectToUrl('/dashboard');
      },
      onError(e: any) {
        let msg = '';
        if (e.msg) {
          message.error(e.msg);
          msg = e.msg;
        } else {
          message.error(e.message);
          msg = e.message;
        }
      },

      manual: true,
      debounceWait: 500
    }
  );

  const verifyGoogle = (code: string) => {
    BurialPoint.track('signup-Google三方登录code验证');
    if (code) {
      webApi.userApi
        .googleVerify(code)
        .then((res: any) => {
          if (res.status === 'UNACTIVATED') {
            redirectToUrl(`/?type=${AuthType.INVITE_CODE}`, true);
            setTimeout(() => {
              setAuthType({
                type: AuthType.INVITE_CODE,
                params: {
                  registerType: ThirdPartyAuthType.GOOGLE,
                  ...res
                }
              });
            }, 1000);
          } else {
            setUserInfo(omit(res, 'token'));
            setToken(res.token);
            setAuthModalOpen(false);
            redirectToUrl('/dashboard');
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
            setTimeout(() => {
              setAuthType({
                type: AuthType.INVITE_CODE,
                params: {
                  registerType: ThirdPartyAuthType.GITHUB,
                  ...res
                }
              });
            }, 1000);
            // skipInviteCode(res.token);
          } else {
            BurialPoint.track('signup-Github三方登录code验证成功');
            setUserInfo(omit(res, 'token'));
            setToken(res.token);
            setAuthModalOpen(false);
            redirectToUrl('/dashboard');
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
    querySource = (querySource as string).toLocaleLowerCase().replace(/^\w/, (s) => s.toLocaleUpperCase());
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
    <div className="flex h-full w-full flex-col items-center">
      {verifyState === VerifyStateType.VERIFYING && <Verifying type={source}></Verifying>}
      {verifyState === VerifyStateType.SUCCESS && <Success type={source}></Success>}
      {verifyState === VerifyStateType.FAIL && <Fail type={source}></Fail>}
    </div>
  );
};

export default VerifyConfirmed;
