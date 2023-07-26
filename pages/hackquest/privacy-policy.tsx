import { NextPage } from 'next';
import Image from 'next/image';
import Bg from '@/public/images/home/policy_banner.svg';

interface NotFoundPageProps {
  children: React.ReactNode;
}

const NotFoundPage: NextPage<NotFoundPageProps> = (props) => {
  return (
    <div className="text-center w-full text-white font-next-book-bold">
      <div className="w-full h-[77.25rem] bg-black relative">
        <Image src={Bg} alt="bg" className="w-full mt-[3.375rem]"></Image>
        <div className="w-full h-full absolute -top-[3.375rem] left-0 bg-gradient-to-b from-transparent to-black">
          <h1 className="mt-[12.5rem] font-next-poster-Bold text-[3.375rem] text-[#F5F5F5] text-center font-bold tracking-[.2025rem]">
            Cookies Policy
          </h1>
          <p className="text-center font-next-book leading-[125%] tracking-[.0225rem] text-[1.125rem] text-[#F4F4F4] mt-[3.25rem]">
            This page describes what information they gather, how we use it and
            why we sometimes need to store these cookies.
          </p>
          <h1 className="text-white font-next-poster-Bold tracking-[.15rem] text-[2.5rem] font-bold text-left mt-[23.75rem]">
            What Are Cookies.
          </h1>
          <div className="mt-[4.5rem] flex flex-col gap-[1.875rem] text-left text-[1.5rem] font-next-book leading-[125%] tracking-[.03rem] text-[#F4F4F4]">
            <p className="">
              As is common practice with almost all professional websites this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience.
            </p>
            <p className="">
              {`This page describes what information they gather, how we use it and
            why we sometimes need to store these cookies. We will also share how
            you can prevent these cookies from being stored however this may
            downgrade or 'break' certain elements of the sites functionality.`}
            </p>
            <p className="">
              <span>
                For more general information on cookies see the Wikipedia
                article on HTTP Cookies
              </span>
              <a href="https://en.wikipedia.org/wiki/HTTP_cookie.">
                https://en.wikipedia.org/wiki/HTTP_cookie.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="">464641</div>
    </div>
  );
};

export default NotFoundPage;
