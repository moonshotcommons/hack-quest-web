import { NextPage } from 'next';
import Congrats from '@/public/images/course/congrats.svg';
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
          setJump(true);
        })
        .catch((err) => {
          console.log(err);
          router.push('/404');
        });
    } else {
      router.push('/404');
    }
  }, [router, dispatch]);

  useEffect(() => {
    if (jump) {
      if (countDown > 0) {
        const timer = setInterval(() => {
          setCountDown(countDown - 1);
        }, 1000);
        return () => {
          clearInterval(timer);
        };
      } else {
        router.push('/courses');
      }
    }
  }, [jump, countDown, router]);

  return (
    <div className="w-full h-full min-h-screen flex justify-end items-center">
      <div className="py-[19.78rem] px-[7.5rem] text-center flex flex-col justify-center items-center gap-8">
        <Image src={Congrats} alt="Congrats"></Image>
        <h1 className="text-[#F8F8F8] text-[1.75rem] font-next-book-bold font-bold leading-[150%] -tracking-[0.01924rem]">
          Email Confirmed
        </h1>
        <div className="text-[#676767] font-next-book w-[31.8125rem] leading-[150%] -tracking-[0.011rem]">
          <span>
            Thank you for confirming your email address. You will be redirected
            to the All Courses page in {countDown} second.
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed;
