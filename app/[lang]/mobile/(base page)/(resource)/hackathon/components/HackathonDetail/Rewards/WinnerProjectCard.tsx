import BaseImage from '@/components/Common/BaseImage';
import TrackTag from '@/components/Common/TrackTag';
import MenuLink from '@/constants/MenuLink';
import { separationNumber } from '@/helper/utils';
import {
  HackathonJudgeProjectType,
  HackathonDetailRewardType,
  HackathonJudgeType
} from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface WinnerProjectCardProp {
  project: HackathonJudgeProjectType;
  reward: HackathonDetailRewardType;
  judge: HackathonJudgeType;
}

const WinnerProjectCard: React.FC<WinnerProjectCardProp> = ({ project, reward, judge }) => {
  return (
    <div className="flex w-full flex-col gap-[.5rem] overflow-hidden rounded-[1.5rem] border border-neutral-light-gray bg-neutral-white p-[1rem]">
      <div className="flex w-full items-center gap-[.75rem] overflow-hidden">
        <BaseImage
          src={project?.logo}
          alt={project.name}
          className="h-[3.5rem] w-[3.5rem] flex-shrink-0 rounded-[.5rem] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
        />
        <div className="flex-1 flex-shrink-0 overflow-hidden">
          <Link
            href={`${MenuLink.PROJECTS}/${project.alias}`}
            className="text-h3-mob flex w-full items-center justify-between overflow-hidden"
          >
            <h2 className="w-[80%] truncate text-neutral-off-black">{project.name}</h2>
            <LuChevronRight size={28} className="text-neutral-off-black" />
          </Link>
          <div className="flex max-h-[1.75rem] w-full flex-wrap gap-[12px] overflow-hidden">
            {project.tracks?.map((t) => <TrackTag track={t} key={t} className="text-[.75rem]" />)}
          </div>
        </div>
      </div>

      <div
        className="body-xs line-clamp-3 h-[3.5625rem] whitespace-pre-line text-neutral-rich-gray"
        dangerouslySetInnerHTML={{ __html: project.detail?.detailedIntro as string }}
      ></div>
      {!judge.disableJudge && (
        <div className="body-s flex gap-[2.5rem]  border-t border-neutral-light-gray pt-[.5rem] text-neutral-medium-gray">
          <div>
            <p>Rank</p>
            <p className="text-neutral-black">{`${project.votes?.rank}/${reward.projectCount}`}</p>
          </div>
          <div>
            <p>Votes</p>
            <p className="text-neutral-black">{`${separationNumber(project.votes?.totalVotes)}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnerProjectCard;
