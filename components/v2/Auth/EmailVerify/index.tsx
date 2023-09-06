import Button from '@/components/Common/Button';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface EmailVerifyProps {}

const EmailVerify: FC<EmailVerifyProps> = (props) => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex-col flex items-center">
      <div className="flex flex-col gap-[25px]">
        <h1 className="text-white text-[2rem] font-next-book leading-[125%] tracking-[0.64px]">
          Verify Your Email
        </h1>
        <div className="text-white font-next-book leading-[160%] text-[14px] -tracking-[0.154px]">
          <span>
            Please verify your account via the link in the e-mail and follow the
            instruction to login.{<br />}
          </span>
          <p className="whitespace-nowrap">{`If you don't receive an email from us, please check your spam`}</p>
          <p>
            <span>folder or</span>
            <span className="text-white font-next-book -tracking-[0.154px] text-left mt-1 cursor-pointer underline ml-1">
              Contact customer support
            </span>
          </p>

          {/* <Image src={Logo} alt="logo" width={191} className="mt-[2rem]"></Image> */}
        </div>
        <div className="w-full flex flex-col justify-center items-center">
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
            Resend Link
          </Button>
        </div>

        <Button
          onClick={() => router.back()}
          block
          className="
          font-next-book
          text-[1.125rem]
          border
          bg-transparent
          text-white hover:text-auth-ghost-button-text-hover-color
          border-white hover:border-auth-ghost-button-border-hover-color
          "
        >
          Change Email
        </Button>
      </div>
    </div>
  );
};

export default EmailVerify;
