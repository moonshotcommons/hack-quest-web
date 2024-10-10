'use client';
import React from 'react';
import Image from 'next/image';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import TrackTag from '@/components/Common/TrackTag';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { PiWarningCircle } from 'react-icons/pi';

interface ProjectCardProp {
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProp> = ({ project }) => {
  const goProjectDetail = () => {
    BurialPoint.track(`hackathon projectCard 点击`);
  };
  return (
    <Link
      href={`${MenuLink.PROJECTS}/${project.alias}`}
      className="card-hover relative  flex h-[7.5rem]  w-full overflow-hidden rounded-[10px] bg-neutral-white"
      onClick={goProjectDetail}
    >
      <div className="relative h-full w-[7.5rem] flex-shrink-0 bg-[#d9d9d9]/30">
        <Image src={project.logo || ''} alt={project.alias} fill className="object-cover" loading="lazy"></Image>
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
          <div className="flex items-center gap-1">
            {project.invalid && <PiWarningCircle className="size-4 flex-shrink-0 text-status-error-dark" />}
            <h2
              className={`body-xs flex-1 truncate ${project.invalid ? 'text-status-error-dark' : 'text-neutral-off-black'} `}
            >
              {project.name}
            </h2>
          </div>
        </div>
        <div className="caption-10pt flex w-full gap-[.25rem] text-neutral-rich-gray">
          {/* <span className="flex-shrink-0">2022 Summer</span>
          <span className="h-[.875rem] w-[.0625rem] flex-shrink-0 bg-neutral-rich-gray"></span> */}
          <span className="w-0 flex-1 truncate">{project.hackathonName}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
