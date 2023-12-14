import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/public/images/logo/light-footer-logo.svg';
import { useRouter } from 'next/router';
interface EmailVerifyProps {
  children: React.ReactNode;
}

const EmailVerify: NextPage<EmailVerifyProps> = (props) => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex-col flex justify-center items-center">
      <Image src={Logo} alt="logo" className="scale-125"></Image>

      <div className="flex flex-col gap-[2.25rem] mt-[4.375rem] ">
        <h1 className="text-text-default-color text-[2rem] font-next-book leading-[125%] -tracking-[0.01924rem]">
          We have sent you a verification e-mail.
        </h1>
        <div className="text-auth-description-text-color font-next-book leading-[125%] text-[1.125rem] tracking-[.0225rem]">
          <span>
            Please verify your account via the link in the e-mail and follow the
            instruction to login.{<br />}
          </span>
          <p className="whitespace-nowrap">{`If you don't receive an email from us, please check your spam folder or`}</p>
          <span className="text-auth-description-text-color font-next-book-bold text-[1rem] leading-[125%] tracking-[.0225rem] text-left mt-1 cursor-pointer underline">
            Contact customer support
          </span>

          {/* <Image src={Logo} alt="logo" width={191} className="mt-[2rem]"></Image> */}
        </div>
        {/* <div className="w-full flex flex-col justify-center items-center">
          <Button
            // onClick={onLogin}
            // block
            className="
          w-[90%]
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
          >
            Resend Link
          </Button>
        </div> */}
        <div
          className="flex justify-center underline font-next-book text-[1.125rem] cursor-pointer"
          onClick={() => router.back()}
        >
          Change Email
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
