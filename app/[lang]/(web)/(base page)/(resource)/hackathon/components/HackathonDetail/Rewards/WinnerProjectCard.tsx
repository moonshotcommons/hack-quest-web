import BaseImage from '@/components/Common/BaseImage';
import TrackTag from '@/components/Common/TrackTag';
import MenuLink from '@/constants/MenuLink';
import { separationNumber } from '@/helper/utils';
import { HackathonJudgeProjectType, HackathonDetailRewardType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface WinnerProjectCardProp {
  project: HackathonJudgeProjectType;
  reward: HackathonDetailRewardType;
}

const WinnerProjectCard: React.FC<WinnerProjectCardProp> = ({ project, reward }) => {
  return (
    <div className="flex w-full items-stretch gap-[24px] overflow-hidden rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[24px]">
      <BaseImage
        src={project?.logo}
        alt={project.name}
        className="h-[148px] w-[148px] flex-shrink-0 rounded-[8px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
      />
      <div className="flex flex-1 flex-shrink-0 flex-col justify-between overflow-hidden">
        <div className="w-full">
          <Link
            href={`${MenuLink.PROJECTS}/${project.alias}`}
            className="text-h3 flex  w-full items-center justify-between "
          >
            <h2 className="w-[80%] truncate text-neutral-off-black">{project.name}</h2>
            <LuChevronRight size={40} className="text-neutral-off-black" />
          </Link>
          <div className="flex max-h-[29px] w-full flex-wrap gap-[12px] overflow-hidden">
            {project.tracks?.map((t) => <TrackTag track={t} key={t} />)}
          </div>
        </div>
        <div
          className="body-xs line-clamp-3 h-[58px] whitespace-pre-line text-neutral-rich-gray"
          dangerouslySetInnerHTML={{ __html: project.detail?.detailedIntro as string }}
        ></div>
      </div>
      <div className="body-s flex w-[200px] flex-shrink-0 flex-col justify-between border-l border-neutral-light-gray pl-[24px] text-neutral-medium-gray">
        <div>
          <p>Rank</p>
          <p className="text-neutral-black">{`${project.votes?.rank}/${reward.projectCount}`}</p>
        </div>
        <div>
          <p>Votes</p>
          <p className="text-neutral-black">{`${separationNumber(project.votes?.totalVotes)}`}</p>
        </div>
      </div>
    </div>
  );
};

export default WinnerProjectCard;
