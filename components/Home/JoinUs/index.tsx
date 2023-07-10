import { FC, ReactNode } from 'react';
import ContractUs from '../ContractUs';

interface JoinUsProps {}

const JoinUs: FC<JoinUsProps> = (props) => {
  return (
    <div className="text-white flex justify-between">
      <div>图片</div>
      <div className="flex flex-col justify-center text-center">
        <div className="w-[17.3125rem] text-[2rem] font-next-poster-Bold leading-[120%] tracking-[0.08rem]">
          Join our Web3 hacker community
        </div>
        <div className="w-[19.25rem] font-next-book-Thin text-[1rem] leading-[120%] mt-[1.63rem]">
          Connect with thousands of other brilliant minds in Web3, just like you
        </div>
        <ContractUs className="gap-[2.19rem] mt-[2rem] mx-auto"></ContractUs>
      </div>
    </div>
  );
};

export default JoinUs;
