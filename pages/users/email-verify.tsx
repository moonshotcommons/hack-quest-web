import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/public/images/logo/text-Logo.svg';
interface EmailVerifyProps {
  children: React.ReactNode;
}

const EmailVerify: NextPage<EmailVerifyProps> = (props) => {
  return (
    <div className="w-full h-full min-h-screen flex justify-end items-center">
      <div className="py-[19.78rem] px-[7.5rem] text-left">
        <h1 className="text-[#F8F8F8] text-[1.75rem] font-next-book-bold font-bold leading-[150%] -tracking-[0.01924rem]">
          We have sent you a verification e-mail.
        </h1>
        <div className="text-[#676767] font-next-book w-[31.8125rem] leading-[150%] -tracking-[0.011rem] mt-[2rem]">
          <span>
            Please verify your account via the link in the e-mail and follow the
            instruction to login.{<br />}
          </span>
          <p className="whitespace-nowrap">{`If you don't receive an email from us, please check your spam folder or`}</p>
          <span className="text-[#F8F8F8] font-next-book-bold text-[1rem] leading-[150%] -tracking-[0.011rem] mt-1 cursor-pointer">
            Contact customer support
          </span>
          <Image
            src={Logo}
            alt="logo"
            width={191}
            className="mt-[2rem]"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
