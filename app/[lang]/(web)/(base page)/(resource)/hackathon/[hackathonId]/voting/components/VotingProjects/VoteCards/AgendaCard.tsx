import TrackTag from '@/components/Common/TrackTag';
import { HackathonVoteProject } from '@/service/webApi/resourceStation/type';
// import Image from 'next/image';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import HandleVote from './HandleVote';
import { ViewValue } from '.';

interface AgendaCardProp {
  project: HackathonVoteProject;
}

const AgendaCard: React.FC<AgendaCardProp> = () => {
  return (
    <div className="flex h-[196px] gap-[24px] rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[24px]">
      <div className="relative h-[148px] w-[148px] flex-shrink-0 overflow-hidden rounded-[8px]">
        {/* <Image src={} alt={} fill className='object-cover' /> */}
      </div>
      <div className="flex h-full flex-1 flex-col justify-between overflow-hidden border-r border-neutral-light-gray pr-[24px]">
        <div>
          <div className="text-h3 flex w-full items-center justify-between text-neutral-off-black">
            <h2 className="w-[80%] truncate">MetaLine-X</h2>
            <LuChevronRight size={40} />
          </div>
          <div className="flex w-full gap-[12px] overflow-hidden">
            <TrackTag track={'Defi'} /> <TrackTag track={'Defi'} />
          </div>
        </div>
        <p className="body-xs line-clamp-3 text-neutral-rich-gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, sapien at maximus tristique,
          tellus turpis feugiat dui, non tempus urna turpis sed ex.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Curabitur tincidunt, sapien at maximus tristique
        </p>
      </div>
      <div className="h-full w-[209px] rounded-[8px] bg-neutral-off-white p-[12px] pt-[40px]">
        <HandleVote view={ViewValue.AGENDA} />
      </div>
    </div>
  );
};

export default AgendaCard;
