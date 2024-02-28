import { FC } from 'react';
import { developerCardData } from '@/app/(web)/(base page)/(landing)/mantle/MantleDeveloperJourney/constant';
import Image from 'next/image';
interface DeveloperCardProps {
  data: (typeof developerCardData)[number];
}
const DeveloperCard: FC<DeveloperCardProps> = ({ data }) => {
  return (
    <div className="flex h-[12.8125rem] flex-col items-center gap-5 rounded-[15px] border border-[#202020] bg-black p-[.625rem]">
      <div className="relative w-[5.625rem] flex-1">
        <Image
          src={data.cover}
          alt="mantle developer journey"
          fill
          className="object-contain"
        ></Image>
      </div>
      <div className="flex h-[4.6875rem] flex-col gap-4">
        <p className="flex h-[26px] items-center justify-center text-[.75rem] font-medium leading-[110%] text-white">
          {data.title}
        </p>
        <div className="rounded-[.625rem] bg-[#202020] p-[.625rem] text-[.625rem] leading-[140%] text-[#C4C4C4]">
          {data.miles}
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
