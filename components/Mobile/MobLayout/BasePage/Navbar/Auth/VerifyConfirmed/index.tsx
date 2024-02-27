import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import webApi from '@/service';

import { omit } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import Google from '@/public/images/login/google.svg';
import Github from '@/public/images/login/github.svg';
import Image from 'next/image';
import { LoginResponse, ThirdPartyAuthType } from '@/service/webApi/user/type';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { AuthContext } from '..';
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
      <p className="body-l">Verifying Email...</p>
    </div>
  );
};
const Success: React.FC<{ type: ThirdPartyAuthType }> = ({ type }) => {
  const { redirectToUrl } = useRedirect();
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(5);
  const { changeNavState } = useContext(AuthContext);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else {
      changeNavState();
      redirectToUrl('/dashboard');
    }
  }, [countDown]);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-6">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.98 10.64C41.8624 8.98653 39.9958 7.997 38 8.00001H10C6.68629 8.00001 4 10.6863 4 14V34C4 37.3137 6.68629 40 10 40H38C41.3137 40 44 37.3137 44 34V14C44.0027 12.8034 43.6475 11.6332 42.98 10.64ZM9.99978 11.9997H37.9998C38.5742 12.0005 39.1206 12.2482 39.4998 12.6797L23.9998 21.7397L8.51978 12.6597C8.89789 12.2408 9.43542 12.0011 9.99978 11.9997ZM37.9998 36.0002C39.1043 36.0002 39.9998 35.1048 39.9998 34.0002V16.9802L25.9998 25.1802C25.3921 25.5327 24.7023 25.719 23.9998 25.7202C23.2991 25.7251 22.6094 25.5457 21.9998 25.2002L7.99976 16.9802V34.0002C7.99976 35.1048 8.89519 36.0002 9.99976 36.0002H37.9998Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h3-m text-neutral-off-black">Email Verified! 🎉</h1>
        <p className="body-m text-neutral-medium-gray">
          You have been successfully verified the email! You will be directed to
          homepage in 5 seconds.
        </p>
      </div>
      {/* <Button
        // onClick={onLogin}
        block
        className="
          
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
      >
        {`Continue to Homepage (${countDown}s)`}
      </Button> */}
      <div className="mt-[4rem] flex w-full flex-col gap-4">
        <Button
          onClick={() => {}}
          block
          className={`
          button-text-m border-auth-primary-button-border-color bg-auth-primary-button-bg
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
              button-text-m border-auth-primary-button-border-color bg-auth-primary-button-bg
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
                className=" button-text-m relative border-auth-primary-button-border-color
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
                className="button-text-m border-neutral-off-black py-4 uppercase"
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
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.98 10.64C41.8624 8.98653 39.9958 7.997 38 8.00001H10C6.68629 8.00001 4 10.6863 4 14V34C4 37.3137 6.68629 40 10 40H38C41.3137 40 44 37.3137 44 34V14C44.0027 12.8034 43.6475 11.6332 42.98 10.64ZM9.99978 11.9997H37.9998C38.5742 12.0005 39.1206 12.2482 39.4998 12.6797L23.9998 21.7397L8.51978 12.6597C8.89789 12.2408 9.43542 12.0011 9.99978 11.9997ZM37.9998 36.0002C39.1043 36.0002 39.9998 35.1048 39.9998 34.0002V16.9802L25.9998 25.1802C25.3921 25.5327 24.7023 25.719 23.9998 25.7202C23.2991 25.7251 22.6094 25.5457 21.9998 25.2002L7.99976 16.9802V34.0002C7.99976 35.1048 8.89519 36.0002 9.99976 36.0002H37.9998Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h3-mob text-neutral-off-black">
          Verification Failed! 😵
        </h1>
        <p className="body-m text-neutral-medium-gray">
          Your verification has failed! Please verify your Email again.
        </p>
      </div>
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
  const { changeNavState } = useContext(AuthContext);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
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

          setUserInfo(omit(res, 'token'));
          setToken(res.token || token);
          changeNavState();
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
        changeNavState();
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
            // redirectToUrl(`/?type=${AuthType.INVITE_CODE}`, true);
            setAuthType({
              type: AuthType.INVITE_CODE,
              params: {
                registerType: ThirdPartyAuthType.GOOGLE,
                ...res
              }
            });
            // skipInviteCode(res.token);
          } else {
            setUserInfo(omit(res, 'token'));
            setToken(res.token);
            changeNavState();
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
            // redirectToUrl(`/?type=${AuthType.INVITE_CODE}`, true);
            setAuthType({
              type: AuthType.INVITE_CODE,
              params: {
                registerType: ThirdPartyAuthType.GITHUB,
                ...res
              }
            });
            // skipInviteCode(res.token);
          } else {
            BurialPoint.track('signup-Github三方登录code验证成功');
            setUserInfo(omit(res, 'token'));
            setToken(res.token);
            changeNavState();
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
    <div className="flex h-full w-full flex-col items-center">
      {verifyState === VerifyStateType.VERIFYING && (
        <Verifying type={source}></Verifying>
      )}
      {verifyState === VerifyStateType.SUCCESS && (
        <Success type={source}></Success>
      )}
      {verifyState === VerifyStateType.FAIL && <Fail type={source}></Fail>}
    </div>
  );
};

export default VerifyConfirmed;
