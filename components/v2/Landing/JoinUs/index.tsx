import JoinUsImage from '@/public/images/home/join_us.png';
import Image from 'next/image';
import { FC } from 'react';
import ContractUs from '../ContractUs';

interface JoinUsProps {}

const JoinUs: FC<JoinUsProps> = (props) => {
  return (
    <div className="text-text-default-color flex wap:flex-col">
      <div>
        <Image src={JoinUsImage} alt="join_us" width={868} height={684}></Image>
      </div>
      <div className="flex flex-col justify-center text-center items-center ml-8 wap:ml-0">
        <div className="w-[17.3125rem] text-[2rem] wap:text-[24px] font-next-poster-Bold leading-[120%] tracking-[0.08rem] wap:mt-[30px]">
          Join our Web3 hacker community
        </div>
        <div className="w-[19.25rem] wap:w-full font-next-book-Thin text-[1rem] wap:text-[14px] leading-[120%] mt-[1.63rem]">
          Connect with thousands of other brilliant minds in Web3, just like you
        </div>
        <ContractUs
          className="gap-[2.19rem] mt-[2rem] mx-auto"
          theme="dark"
        ></ContractUs>
      </div>
    </div>
  );
};

export default JoinUs;
