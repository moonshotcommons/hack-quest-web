'use client';
import React from 'react';
import Image from 'next/image';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import TrackTag from '@/components/Common/TrackTag';
import Link from 'next/link';
import { cn } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import { PiWarningCircle } from 'react-icons/pi';

interface ProjectCardProp {
  className?: string;
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProp> = ({ className = '', project }) => {
  return (
    <Link
      className={cn(
        'card-hover relative  flex w-full cursor-pointer flex-col overflow-hidden rounded-[10px] bg-neutral-white',
        className
      )}
      href={`${MenuLink.PROJECTS}/${project.alias}`}
    >
      <div className="relative h-0 w-full bg-[#d9d9d9]/30 pt-[56%]">
        <Image src={project.logo || ''} alt={project.alias} fill className="object-cover" loading="lazy"></Image>
      </div>
      <div className="flex h-[215px] flex-col justify-between p-[16px]">
        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex w-full gap-[8px] overflow-hidden">
            {project.apolloDay && (
              <TrackTag
                track={'Apollo Day'}
                className="body-m caption-12pt flex-shrink-0 border-yellow-primary bg-yellow-primary"
              />
            )}
            {project.winner && (
              <span className="inline-flex items-center justify-center rounded-full bg-yellow-primary px-3 py-1 text-sm font-light">
                Winner
              </span>
            )}
            {project.tracks.map((v, i) => (
              <TrackTag key={i} track={v} className="caption-12pt flex-shrink-0" />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {project.invalid && <PiWarningCircle className="size-4 flex-shrink-0 text-status-error-dark" />}
            <h2
              className={`body-m-bold flex-1 truncate ${project.invalid ? 'text-status-error-dark' : 'text-neutral-off-black'} `}
            >
              {project.name}
            </h2>
          </div>

          <div className="body-s line-clamp-2 text-neutral-rich-gray">
            {project.detail?.oneLineIntro || project.detail?.detailedIntro}
          </div>
        </div>
        <div className="caption-12pt flex items-center gap-[10px]  text-neutral-rich-gray">
          {/* <span className="flex-shrink-0">2022 Summer</span>
          <span className="h-[16px] w-[1px] flex-shrink-0 bg-neutral-rich-gray"></span> */}
          <span className="flex-1 flex-shrink-0 truncate">{project.hackathonName}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
