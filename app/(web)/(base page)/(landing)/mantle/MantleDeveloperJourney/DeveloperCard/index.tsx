import { FC } from 'react';
import { developerCardData } from '@/app/(web)/(base page)/(landing)/mantle/MantleDeveloperJourney/constant';
import Image from 'next/image';
interface DeveloperCardProps {
  data: (typeof developerCardData)[number];
}
const DeveloperCard: FC<DeveloperCardProps> = ({ data }) => {
  return (
    <div className="flex h-[10rem] items-center gap-5 rounded-[15px] border border-[#202020] bg-black px-5">
      <div className="relative h-full w-[5.625rem]">
        <Image
          src={data.cover}
          alt="mantle developer journey"
          fill
          className="object-contain"
        ></Image>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <p className="flex h-10 items-center justify-center text-[1.125rem] font-medium leading-[110%] text-white">
          {data.title}
        </p>
        <div className="rounded-[.625rem] bg-[#202020] p-[.625rem] text-base leading-[140%] text-[#C4C4C4]">
          {data.miles}
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
