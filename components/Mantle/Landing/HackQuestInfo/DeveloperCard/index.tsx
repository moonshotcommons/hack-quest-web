import Image from 'next/image';
import { FC, ReactNode } from 'react';
import MantleIcon from '@/public/images/mantle/mantle_icon.svg';
import { cn } from '@/helper/utils';
interface DeveloperCardProps {
  title: string;
  description: string;
  className?: string;
}
const DeveloperCard: FC<DeveloperCardProps> = (props) => {
  return (
    <div
      className={cn(
        'w-[calc((100%-80px)/3)] slab:w-[calc((100%-24px)/3)] wap:w-[calc((100%-12px)/2)] px-[70px] slab:px-[8px] slab:pt-[16px] slab:pb-[16px] pt-[30px] pb-[20px] rounded-[15px] justify-between items-center flex flex-col border-[#171717] border',
        props.className
      )}
      style={{
        background:
          'linear-gradient(261deg, #0B242B 1.16%, #0A0B0B 49.12%, #0B181C 98.08%)'
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[24px] slab:text-[12px] font-medium leading-[110%] ">
          {props.title}
        </p>
      </div>
      <div className="mt-[15px] lg:w-[255px] flex-center slab:w-full slab:mt-[20px]  slab:text-[10px] flex  p-[10px] bg-[#1C363C] rounded-[10px]  w-fit">
        {/* <Image src={MantleIcon} alt="mantle" className="slab:hidden"></Image> */}
        {/* <Image
          src={MantleIcon}
          width={16}
          alt="mantle"
          className="hidden slab:block"
        ></Image> */}
        <span>{props.description}</span>
      </div>
    </div>
  );
};

export default DeveloperCard;
