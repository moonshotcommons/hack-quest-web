import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import { FC, ReactNode } from 'react';

interface GuidePageProps {
  // children: ReactNode;
}

const GuidePage: FC<GuidePageProps> = (props) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-[.75rem] mt-[3.375rem]">
        <div className="max-w-fit flex items-center justify-center p-2 rounded-full bg-[#000] border border-solid border-[#303030] hover:bg-[#303030] cursor-pointer">
          <LeftArrowIcon></LeftArrowIcon>
        </div>
        <div className="text-[#F2F2F2F2] font-next-poster-Bold text-2xl">
          Mini Coin
        </div>
      </div>
      <div className="w-full h-[46.5625rem] bg-[#111] rounded-[2.5rem] mt-[1.875rem] px-[3rem] py-[2.5rem] flex flex-col">
        <div className="w-full h-full flex gap-[4rem] justify-between">
          <div className="w-full h-full bg-red-400"></div>
          <div className="w-full h-full bg-blue-400"></div>
        </div>
        <div className="mt-[2.5rem] gap-4 flex justify-end">
          <button className="flex justify-center items-center w-[10rem] h-[3rem] border border-solid border-[#F2F2F2] rounded-[2.5rem] font-next-book text-sm text-[#F2F2F2] primary-button-hover">
            Back
          </button>
          <button className="flex justify-center items-center w-[10rem] h-[3rem] border border-solid border-[#F2F2F2] rounded-[2.5rem] font-next-book text-sm text-[#F2F2F2] primary-button-hover">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
