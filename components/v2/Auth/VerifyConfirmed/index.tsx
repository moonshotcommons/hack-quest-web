import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import webApi from '@/service';
import { setUserInfo } from '@/store/redux/modules/user';
import { omit } from 'lodash-es';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

enum VerifyStateType {
  VERIFYING = 'verifying',
  SUCCESS = 'success',
  FAIL = 'fail'
}

interface VerifyConfirmedProps {}

const Verifying = () => {
  return (
    <div className="text-center flex flex-col items-center gap-[25px]">
      <h1 className="text-white text-[1.75rem] font-next-book-bold font-bold leading-[125%] -tracking-[0.01924rem]">
        Verifying...
      </h1>
      <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
        <span>Please wait... We are verifying your email...</span>
      </div>
    </div>
  );
};
const Success = () => {
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
      router.push('/home');
    }
  }, [countDown, router]);

  return (
    <div className="flex flex-col gap-[25px]">
      <h1 className="text-white text-[32px] font-next-book-bold font-bold leading-[125%] -tracking-[0.64px] flex items-center">
        Email Verified! 🎉
      </h1>
      <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
        <span>
          You have been successfully verified the email! You will be redirected
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
const Fail = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-white text-[1.75rem] font-next-book-bold font-bold leading-[125%] -tracking-[0.64px]">
        Verification Failed! 😵
      </h1>
      <div className="text-white font-next-book leading-[160%] tracking-[0.64px] text-[18px]">
        <span>
          Your verification has failed!
          <br />
          Please verify your Email again.
        </span>
      </div>
      <Button
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
        try login
      </Button>
    </div>
  );
};

const VerifyConfirmed: FC<VerifyConfirmedProps> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const [verifyState, setVerifyState] = useState(VerifyStateType.VERIFYING);
  useEffect(() => {
    const { token } = router.query;
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
  }, [router, dispatch]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {verifyState === VerifyStateType.VERIFYING && <Verifying></Verifying>}
      {verifyState === VerifyStateType.SUCCESS && <Success></Success>}
      {verifyState === VerifyStateType.FAIL && <Fail></Fail>}
    </div>
  );
};

export default VerifyConfirmed;
