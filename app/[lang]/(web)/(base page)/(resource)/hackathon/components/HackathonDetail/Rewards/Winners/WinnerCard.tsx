import BaseImage from '@/components/Common/BaseImage';
import TrackTag from '@/components/Common/TrackTag';
import MenuLink from '@/constants/MenuLink';
import { separationNumber } from '@/helper/utils';
import Link from 'next/link';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface WinnerCardProp {}

const WinnerCard: React.FC<WinnerCardProp> = () => {
  return (
    <div className="flex w-full items-stretch gap-[24px] overflow-hidden rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[24px]">
      <BaseImage
        src={'/images/navbar/my-hackathon.svg'}
        alt={''}
        className="h-[148px] w-[148px] flex-shrink-0 rounded-[8px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href={`${MenuLink.PROJECTS}`} className="text-h3 flex w-full items-center justify-between ">
            <h2 className="w-[80%] truncate text-neutral-off-black">撒打算打算的</h2>
            <LuChevronRight size={40} className="text-neutral-off-black" />
          </Link>
          <div className="flex max-h-[29px] w-full flex-wrap gap-[12px] overflow-hidden">
            <TrackTag track={'1111'} />
          </div>
        </div>
        <div className="body-xs line-clamp-3 whitespace-pre-line text-neutral-rich-gray">sdsdsd</div>
      </div>
      <div className="body-s flex w-[200px] flex-shrink-0 flex-col justify-between border-l border-neutral-light-gray pl-[24px] text-neutral-medium-gray">
        <div>
          <p>Rank</p>
          <p className="text-neutral-black">{`${1}/${2}`}</p>
        </div>
        <div>
          <p>Votes</p>
          <p className="text-neutral-black">{`${separationNumber(1000)}`}</p>
        </div>
        <div>
          <p>Reward</p>
          <p className="text-neutral-black">{`${separationNumber(50000)} ${'USD'}`}</p>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
