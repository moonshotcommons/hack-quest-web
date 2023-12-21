import { NextPage } from 'next';
import FailIcon from '@/public/images/login/robot.svg';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
interface EmailConfirmedProps {
  children: React.ReactNode;
}

const EmailConfirmed: NextPage<EmailConfirmedProps> = (props) => {
  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(3);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-center flex flex-col justify-center items-center gap-8">
        <Image src={FailIcon} alt="fail"></Image>
        <h1 className="text-text-default-color text-[2rem] font-next-book-bold font-bold leading-[150%] -tracking-[0.01924rem]">
          Unable to Verify Email Address!
        </h1>
        <div className="text-auth-description-text-color font-next-book w-[31.8125rem] leading-[150%] -tracking-[0.011rem]">
          <span>
            There was a problem verifying your email address. Please try{' '}
            <Link
              href={'/auth/login'}
              className="underline text-text-default-color"
            >
              Login
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed;
