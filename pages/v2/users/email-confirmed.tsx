import { NextPage } from 'next';
import Verifying from '@/public/images/login/verifying.svg';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import webApi from '@/service';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/redux/modules/user';
import { useState } from 'react';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';
interface EmailConfirmedProps {
  children: React.ReactNode;
}

const EmailConfirmed: NextPage<EmailConfirmedProps> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(3);

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      webApi.userApi
        .tokenVerify({ token: token as string })
        .then((res: any) => {
          dispatch(setUserInfo(omit(res, 'token')));
          setToken(res.token || token);
          router.push('/auth/email-success');
        })
        .catch((err) => {
          console.log(err);
          router.push('/auth/email-fail');
        });
    } else {
      router.push('/auth/email-fail');
    }
  }, [router, dispatch]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-center flex flex-col justify-center items-center gap-8">
        <Image src={Verifying} alt="Congrats"></Image>
        <h1 className="text-text-default-color text-[1.75rem] font-next-book-bold font-bold leading-[150%] -tracking-[0.01924rem]">
          Verifying...
        </h1>
        <div className="text-auth-description-text-color font-next-book w-[31.8125rem] leading-[150%] -tracking-[0.011rem]">
          <span>Please wait... We are verifying your email...</span>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed;
