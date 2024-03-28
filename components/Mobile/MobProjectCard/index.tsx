'use client';
import React from 'react';
import Image from 'next/image';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import TrackTag from '@/components/Common/TrackTag';
import Link from 'next/link';
import { cn } from '@/helper/utils';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

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
      className={cn('relative  flex h-[7.5rem]  w-full overflow-hidden rounded-[10px] bg-neutral-white', className)}
      onClick={goProjectDetail}
      href={`${MenuLink.PROJECTS}/${project.alias}`}
    >
      <div className="relative h-full w-[7.5rem] bg-[#d9d9d9]/30">
        <Image src={project.thumbnail} alt="thumbnail" fill className="object-cover" loading="lazy"></Image>
      </div>
      <div className="flex h-[full] flex-col justify-between p-[.75rem]">
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
          <div className="body-xs truncate text-neutral-off-black">{project.name}</div>
        </div>
        <div className="caption-10pt flex text-neutral-rich-gray">
          <span className="w-0 flex-1 truncate">{project.hackathonName}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
