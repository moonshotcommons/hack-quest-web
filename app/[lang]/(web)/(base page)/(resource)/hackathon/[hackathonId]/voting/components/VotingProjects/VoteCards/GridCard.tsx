import TrackTag from '@/components/Common/TrackTag';
import { HackathonVoteProject } from '@/service/webApi/resourceStation/type';
// import Image from 'next/image';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { ViewValue } from '.';
import HandleVote from './HandleVote';

interface GridCardProp {
  project: HackathonVoteProject;
}

const GridCard: React.FC<GridCardProp> = () => {
  return (
    <div className=" w-full  rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[16px]">
      <div className="mb-[8px]">
        <div className="flex gap-[8px]">
          <div className="relative h-[48px] w-[48px]  overflow-hidden">
            {/* <Image src={} alt={} fill className='object-cover' /> */}
          </div>
          <div className="flex-1">
            <div className="text-h5 flex flex-1 items-center justify-between">
              <h2 className="w-[80%] truncate">MetaLine-X</h2>
              <LuChevronRight size={20} />
            </div>
            <div className="flex w-full gap-[12px] overflow-hidden">
              <TrackTag track={'Defi'} /> <TrackTag track={'Defi'} />
            </div>
          </div>
        </div>
        <div className="caption-10pt mt-[8px] line-clamp-4 h-[60px] text-neutral-rich-gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, sapien at maximus tristique,
          tellus turpis feugiat dui, non tempus urna turpis sed ex.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Curabitur tincidunt, sapien at maximus tristique, tellus turpis feugiat dui, non tempus urna turpis sed
          ex.
        </div>
      </div>
      <div className="h-[63px] w-full rounded-[8px] bg-neutral-off-white px-[12px] py-[8px]">
        <HandleVote view={ViewValue.GRID} />
      </div>
    </div>
  );
};

export default GridCard;
