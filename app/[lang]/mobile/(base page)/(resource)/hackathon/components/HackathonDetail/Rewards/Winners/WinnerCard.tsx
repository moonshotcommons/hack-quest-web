import BaseImage from '@/components/Common/BaseImage';
import TrackTag from '@/components/Common/TrackTag';
import MenuLink from '@/constants/MenuLink';
import { separationNumber } from '@/helper/utils';
import { HackathonJudgeProjectType, HackathonDetailRewardType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface WinnerCardProp {
  project: HackathonJudgeProjectType;
  reward: HackathonDetailRewardType;
  index: number;
}

const WinnerCard: React.FC<WinnerCardProp> = ({ project, reward, index }) => {
  return (
    <div className="flex w-full flex-col gap-[.5rem]  rounded-[1.5rem] border border-neutral-light-gray bg-neutral-white p-[1rem]">
      <div className="flex items-center gap-[.75rem]">
        <BaseImage
          src={project?.logo}
          alt={project.name}
          className="h-[3.5rem] w-[3.5rem] flex-shrink-0 rounded-[.5rem] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
        />
        <div className="flex-1">
          <Link
            href={`${MenuLink.PROJECTS}/${project.alias}`}
            className="text-h3-mob flex w-full items-center justify-between "
          >
            <h2 className="w-[80%] truncate text-neutral-off-black">{project.name}</h2>
            <LuChevronRight size={28} className="text-neutral-off-black" />
          </Link>
          <div className="flex max-h-[1.75rem] w-full flex-wrap gap-[12px] overflow-hidden">
            {project.tracks?.map((t) => <TrackTag track={t} key={t} className="text-[.75rem]" />)}
          </div>
        </div>
      </div>

      <div className="body-xs line-clamp-3 h-[3.5625rem] whitespace-pre-line text-neutral-rich-gray">
        {project.detail?.detailedIntro}
      </div>
      <div className="body-s flex gap-[2.5rem]  border-t border-neutral-light-gray pt-[.5rem] text-neutral-medium-gray">
        <div>
          <p>Rank</p>
          <p className="text-neutral-black">{`${project.votes?.rank}/${reward.projectCount}`}</p>
        </div>
        <div>
          <p>Votes</p>
          <p className="text-neutral-black">{`${separationNumber(project.votes?.totalVotes)}`}</p>
        </div>
        {reward.reward?.rewards?.[index] && (
          <div>
            <p>Reward</p>
            <p className="text-neutral-black">{`${separationNumber(reward.reward?.rewards?.[index]?.value)} ${reward.reward?.currency}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnerCard;
