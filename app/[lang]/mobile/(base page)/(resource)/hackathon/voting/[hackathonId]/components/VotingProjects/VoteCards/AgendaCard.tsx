import TrackTag from '@/components/Common/TrackTag';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { HackathonVoteContext, ViewValue } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import HandleVote from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/voting/[hackathonId]/components/HandleVote';

interface GridCardProp {
  project: ProjectType;
}

const GridCard: React.FC<GridCardProp> = ({ project }) => {
  const { judgeInfo } = useContext(HackathonVoteContext);
  const isShowTick = useMemo(() => {
    return judgeInfo?.judge?.judgeMode === 'judges' && judgeInfo?.judge?.voteMode === 'score';
  }, [judgeInfo]);
  return (
    <div className=" w-full  rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[16px]">
      <div className="mb-[8px]">
        <div className="flex gap-[.75rem]">
          <div className="relative h-[3.5rem] w-[3.5rem] flex-shrink-0  overflow-hidden">
            {project.logo && <Image src={project.logo} alt={project.name} fill className="object-cover" />}
          </div>
          <div className="w-0 flex-1 overflow-hidden">
            <Link
              href={`${MenuLink.PROJECTS}/${project.alias}`}
              className="text-h3-mob mb-[.5rem] flex flex-1 items-center justify-between"
            >
              <h2 className="w-[80%] truncate">{project.name}</h2>
              <LuChevronRight size={20} />
            </Link>
            <div className="flex w-full gap-[.5rem] overflow-hidden">
              {project.tracks?.map((v, i) => <TrackTag track={v} key={i} />)}
            </div>
          </div>
        </div>
        <div
          className="body-xs mt-[.5rem] line-clamp-3  whitespace-pre-line text-neutral-rich-gray"
          dangerouslySetInnerHTML={{ __html: project.detail?.detailedIntro || '' }}
        ></div>
      </div>
      <div className={` w-full ${isShowTick ? 'h-[5.375rem]' : 'h-[3.9375rem]'}`}>
        <HandleVote view={ViewValue.GRID} project={project} />
      </div>
    </div>
  );
};

export default GridCard;
