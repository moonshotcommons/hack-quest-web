import BaseImage from '@/components/Common/BaseImage';
import MenuLink from '@/constants/MenuLink';
import { separationNumber } from '@/helper/utils';
import { HackathonJudgeProjectType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React from 'react';

interface WinnerProjectProp {
  project: HackathonJudgeProjectType;
  isLink?: boolean;
}

const WinnerProject: React.FC<WinnerProjectProp> = ({ project, isLink }) => {
  return (
    <div className="body-l flex w-full items-center gap-[12px] overflow-hidden">
      {project?.logo && (
        <BaseImage
          src={project?.logo || ''}
          alt={project?.name}
          className="h-[32px] w-[32px] rounded-[8px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
        />
      )}
      {isLink ? (
        <Link href={`${MenuLink.PROJECTS}/${project?.alias}`} className="text-h4 block  max-w-[50%] truncate ">
          <span className="text-neutral-off-black underline" title={project?.name}>
            {project?.name}
          </span>
        </Link>
      ) : (
        <span className="text-h4 block  max-w-[50%] truncate" title={project?.name}>
          {project?.name}
        </span>
      )}
      <span>{`by ${project?.creator?.nickname}`}</span>
      <span className="border-l border-neutral-light-gray pl-[12px] text-neutral-medium-gray">{`Rank ${project?.votes?.rank}`}</span>
      <span className="border-l border-neutral-light-gray pl-[12px] text-neutral-medium-gray">{`Votes ${separationNumber(project?.votes?.totalVotes)}`}</span>
    </div>
  );
};

export default WinnerProject;
