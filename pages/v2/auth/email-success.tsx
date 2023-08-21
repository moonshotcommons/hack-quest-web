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
import Button from '@/components/Common/Button';
interface EmailConfirmedProps {
  children: React.ReactNode;
}

const EmailConfirmed: NextPage<EmailConfirmedProps> = (props) => {
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
      router.push('/courses');
    }
  }, [countDown, router]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" text-center flex flex-col justify-center items-center gap-8">
        <Image src={Congrats} alt="Congrats"></Image>
        <h1 className="text-text-default-color text-[1.75rem] font-next-book-bold font-bold leading-[150%] -tracking-[0.01924rem]">
          Email Confirmed
        </h1>
        <div className="text-auth-description-text-color font-next-book w-[31.8125rem] leading-[150%] -tracking-[0.011rem]">
          <span>
            Yahoo! You have been successfully verified the email! You will be
            redirected in {countDown} second.
          </span>
        </div>
        <Button
          onClick={() => router.push('/auth/register')}
          block
          className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
        >
          Continue to Register ({countDown}s)
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmed;
