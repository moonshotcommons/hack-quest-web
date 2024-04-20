'use client';
import React from 'react';
import Image from 'next/image';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import TrackTag from '@/components/Common/TrackTag';
import Link from 'next/link';
import { cn } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';

interface ProjectCardProp {
  className?: string;
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProp> = ({ className = '', project }) => {
  const goProjectDetail = () => {
    BurialPoint.track(`hackathon projectCard 点击`);
  };
  return (
    <Link
      className={cn(
        'card-hover relative  flex h-[7.5rem]  w-full overflow-hidden rounded-[10px] bg-neutral-white',
        className
      )}
      onClick={goProjectDetail}
      href={`${MenuLink.PROJECTS}/${project.alias}`}
    >
      <div className="relative h-full w-[7.5rem] flex-shrink-0 bg-[#d9d9d9]/30">
        <Image src={project.thumbnail} alt={project.alias} fill className="object-cover" loading="lazy"></Image>
      </div>
      <div className="flex h-[full] flex-1 flex-shrink-0 flex-col justify-between p-[1rem]">
        <div className="flex w-full flex-col gap-[.5rem]">
          <div className="flex w-full gap-[.5rem] overflow-hidden">
            {project.apolloDay && (
              <TrackTag
                track={'Apollo Day'}
                className="caption-12pt flex-shrink-0 border-yellow-primary bg-yellow-primary"
              />
            )}
            {project.tracks.map((v, i) => (
              <TrackTag key={i} track={v} className="caption-12pt flex-shrink-0" />
            ))}
          </div>
          <h2 className="body-xs truncate text-neutral-off-black">{project.name}</h2>
        </div>
        <div className="caption-10pt flex w-full gap-[.25rem] text-neutral-rich-gray">
          <span className="flex-shrink-0">2022 Summer</span>
          <span className="h-[.875rem] w-[.0625rem] flex-shrink-0 bg-neutral-rich-gray"></span>
          <span className="w-0 flex-1 truncate">{project.hackathonName}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
