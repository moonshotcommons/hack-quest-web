import Button from '@/components/Mantle/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import webApi from '@/service';
import { setUserInfo } from '@/store/redux/modules/user';
import { omit } from 'lodash-es';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import Google from '@/public/images/login/google.svg';
import Github from '@/public/images/login/github.svg';
import Image from 'next/image';
import { AuthType } from '@/service/webApi/user/type';

enum VerifyStateType {
  VERIFYING = 'verifying',
  SUCCESS = 'success',
  FAIL = 'fail'
}

interface VerifyConfirmedProps {}

const Verifying: React.FC<{ type: AuthType }> = ({ type }) => {
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
const Success: React.FC<{ type: AuthType }> = ({ type }) => {
  const router = useRouter();

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
      router.push(
        '/learning-track/6d108f0d-dfb2-4dad-8f38-93b45573bc43?learningTrackId=6d108f0d-dfb2-4dad-8f38-93b45573bc43&menu=learningTrack'
      );
    }
  }, [countDown, router]);

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

const Fail: React.FC<{ type: AuthType }> = ({ type }) => {
  const loginThreeParty = async (type: AuthType) => {
    const res = (await webApi.userApi.getAuthUrl(type)) as any;
    window.location.href = res?.url;
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const renderTextAndBtn = () => {
    switch (type) {
      case AuthType.EMAIL:
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
                router.push('/');
                dispatch(setUnLoginType(UnLoginType.LOGIN));
              }}
              block
              type="primary"
              className="
          font-next-book
          text-[1.125rem]
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
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
              type="primary"
              className=" font-next-book
              text-[1.125rem]
              text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
              relative"
              onClick={() => loginThreeParty(type)}
            >
              <Image
                src={type === AuthType.GOOGLE ? Google : Github}
                width={22}
                height={22}
                alt={type}
                className="absolute left-[25px] top-[16px]"
              ></Image>
              Continue with {type}
            </Button>
            <Button
              onClick={() => {
                router.push('/');
                dispatch(setUnLoginType(UnLoginType.LOGIN));
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
      <div className="text-white text-[1.75rem] font-next-book-bold font-bold leading-[125%] -tracking-[0.64px]">
        Verification Failed! 😵
      </div>
      {renderTextAndBtn()}
    </div>
  );
};

const VerifyConfirmed: FC<VerifyConfirmedProps> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const [verifyState, setVerifyState] = useState(VerifyStateType.VERIFYING);
  const [source, setSource] = useState<AuthType>(AuthType.EMAIL);
  const verifyEmail = (token: string) => {
    BurialPoint.track('signup-注册邮箱token验证');
    if (token) {
      webApi.userApi
        .tokenVerify({ token: token as string })
        .then((res: any) => {
          dispatch(setUserInfo(omit(res, 'token')));
          BurialPoint.track('signup-注册邮箱token验证成功');
          setToken(res.token || token);
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
  const verifyGoogle = (code: string) => {
    BurialPoint.track('signup-Google三方登录code验证');
    if (code) {
      webApi.userApi
        .googleVerify(code)
        .then((res: any) => {
          if (res.status === 'UNACTIVATED') {
            router.replace(`/?type=${UnLoginType.INVITE_CODE}`);
            dispatch(
              setUnLoginType({
                type: UnLoginType.INVITE_CODE,
                params: {
                  registerType: AuthType.GOOGLE,
                  ...res
                }
              })
            );
          } else {
            dispatch(setUserInfo(omit(res, 'token')));
            BurialPoint.track('signup-Google三方登录code验证成功');
            setToken(res.token);
            router.push(
              '/learning-track/6d108f0d-dfb2-4dad-8f38-93b45573bc43?learningTrackId=6d108f0d-dfb2-4dad-8f38-93b45573bc43&menu=learningTrack'
            );
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
            router.replace(`/?type=${UnLoginType.INVITE_CODE}`);
            dispatch(
              setUnLoginType({
                type: UnLoginType.INVITE_CODE,
                params: {
                  registerType: AuthType.GITHUB,
                  ...res
                }
              })
            );
          } else {
            dispatch(setUserInfo(omit(res, 'token')));
            BurialPoint.track('signup-Github三方登录code验证成功');
            setToken(res.token);
            router.push(
              '/learning-track/6d108f0d-dfb2-4dad-8f38-93b45573bc43?learningTrackId=6d108f0d-dfb2-4dad-8f38-93b45573bc43&menu=learningTrack'
            );
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
    const { token, state } = router.query;
    let code = router.query.code;
    let querySource = router.query.source || AuthType.EMAIL;
    if (state) {
      const verifyData = JSON.parse(atob(state as string));
      querySource = verifyData?.source || AuthType.GOOGLE;
    }
    //第一个字母大写 其余小写
    querySource = (querySource as string)
      .toLocaleLowerCase()
      .replace(/^\w/, (s) => s.toLocaleUpperCase());
    setSource(querySource as AuthType);
    switch (querySource) {
      case AuthType.GOOGLE:
        verifyGoogle(code as string);
        break;
      case AuthType.GITHUB:
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
    </div>
  );
};

export default VerifyConfirmed;
