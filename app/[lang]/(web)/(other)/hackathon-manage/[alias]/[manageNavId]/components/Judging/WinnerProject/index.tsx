import BaseImage from '@/components/Common/BaseImage';
import { separationNumber } from '@/helper/utils';
import Link from 'next/link';
import React from 'react';

interface WinnerProjectProp {
  project: any;
  isLink?: boolean;
}

const WinnerProject: React.FC<WinnerProjectProp> = ({ project, isLink }) => {
  return (
    <div className="body-l flex w-full items-center gap-[12px] overflow-hidden">
      <BaseImage
        src={project.image}
        alt={project.name}
        className="h-[32px] w-[32px] rounded-[8px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
      />
      {isLink ? (
        <Link href={''} className="text-h4 block  max-w-[50%] truncate underline">
          <span title={project.name}>{project.name}</span>
        </Link>
      ) : (
        <span className="text-h4 block  max-w-[50%] truncate" title={project.name}>
          {project.name}
        </span>
      )}
      <span>{`by ${project.team}`}</span>
      <span className="border-l border-neutral-light-gray pl-[12px] text-neutral-medium-gray">{`Rank ${project.rank}`}</span>
      <span className="border-l border-neutral-light-gray pl-[12px] text-neutral-medium-gray">{`Votes ${separationNumber(project.totalVotes)}`}</span>
    </div>
  );
};

export default WinnerProject;
