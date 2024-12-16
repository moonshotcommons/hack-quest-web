import TrackTag from '@/components/Common/TrackTag';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { HackathonVoteContext, ViewValue } from '../../../../../constants/type';
import HandleVote from '../../HandleVote';

interface GridCardProp {
  project: ProjectType;
}

const GridCard: React.FC<GridCardProp> = ({ project }) => {
  const { judgeInfo } = useContext(HackathonVoteContext);
  const isShowTick = useMemo(() => {
    return judgeInfo?.judge?.judgeMode === 'judges' && judgeInfo?.judge?.voteMode === 'score';
  }, [judgeInfo]);
  return (
    <div className=" flex w-full flex-col justify-between rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[12px]">
      <div className="mb-[8px]">
        <div className="flex gap-[8px]">
          <div className="relative h-[48px] w-[48px] flex-shrink-0  overflow-hidden">
            {project.logo && <Image src={project.logo} alt={project.name} fill className="object-cover" />}
          </div>
          <div className="w-0 flex-1 overflow-hidden">
            <Link
              href={`${MenuLink.PROJECTS}/${project.alias}`}
              className="text-h5 flex flex-1 items-center justify-between"
            >
              <h2 className="w-[80%] truncate text-neutral-off-black">{project.name}</h2>
              <LuChevronRight size={20} />
            </Link>
            <div className="flex w-full gap-[12px] overflow-hidden">
              {project.tracks?.map((v, i) => <TrackTag track={v} key={i} />)}
            </div>
          </div>
        </div>
        <div
          className={`caption-10pt mt-[8px] whitespace-pre-line  text-neutral-rich-gray ${isShowTick ? 'line-clamp-3 h-[45px]' : 'line-clamp-4 h-[66px]'}`}
          dangerouslySetInnerHTML={{ __html: project.detail?.detailedIntro || '' }}
        ></div>
      </div>
      <div className={` w-full rounded-[8px] ${isShowTick ? 'h-[90px]' : 'h-[66px]'}`}>
        <HandleVote view={ViewValue.GRID} project={project} />
      </div>
    </div>
  );
};

export default GridCard;
