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
        'w-[400px] wap:w-[calc(50%-6px)] px-[70px] wap:px-[8px] wap:pt-[16px] wap:pb-[16px] pt-[30px] pb-[20px] rounded-[15px] justify-between items-center flex flex-col border-[#171717] border',
        props.className
      )}
      style={{
        background:
          'linear-gradient(261deg, #0B242B 1.16%, #0A0B0B 49.12%, #0B181C 98.08%)'
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[24px] wap:text-[12px] font-medium leading-[110%]">
          {props.title}
        </p>
      </div>
      <div className="mt-[15px] wap:w-full wap:mt-[20px] wap:text-[10px] flex wap:flex-col gap-[10px] p-[10px] bg-[#1C363C] rounded-[10px] items-center wap:items-start w-fit">
        {/* <Image src={MantleIcon} alt="mantle" className="wap:hidden"></Image> */}
        {/* <Image
          src={MantleIcon}
          width={16}
          alt="mantle"
          className="hidden wap:block"
        ></Image> */}
        <span>{props.description}</span>
      </div>
    </div>
  );
};

export default DeveloperCard;
