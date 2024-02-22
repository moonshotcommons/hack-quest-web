'use client';
import React from 'react';
import Image from 'next/image';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { MenuLink } from '../../Layout/BasePage/Navbar/type';
import TrackTag from '@/components/Common/TrackTag';
import Link from 'next/link';
import { cn } from '@/helper/utils';

interface ProjectCardProp {
  className?: string;
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProp> = ({
  className = '',
  project
}) => {
  const goProjectDetail = () => {
    BurialPoint.track(`hackathon projectCard 点击`);
  };
  return (
    <Link
      className={cn(
        'card-hover relative  flex cursor-pointer flex-col overflow-hidden rounded-[10px] bg-neutral-white sm:w-[calc((640px-60px)/4)] md:w-[calc((768px-60px)/4)] lg:w-[calc((1024px-60px)/4)] xl:w-[calc((1280px-60px)/4)] 2xl:w-[calc((1360px-60px)/4)]',
        className
      )}
      onClick={goProjectDetail}
      href={`${MenuLink.PROJECTS}/${project.alias}?${QueryIdType.PROJECT_ID}=${project.id}&menu=${Menu.HACKATHON}`}
    >
      <div className="relative h-0 w-full bg-[#d9d9d9]/30 pt-[56%]">
        <Image
          src={project.thumbnail}
          alt="thumbnail"
          fill
          className="object-cover"
          loading="lazy"
        ></Image>
      </div>
      <div className="flex h-[215px] flex-col justify-between p-[16px]">
        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex w-full gap-[8px] overflow-hidden">
            {project.apolloDay && (
              <TrackTag
                track={'Apollo Day'}
                className="flex-shrink-0 border-yellow-primary bg-yellow-primary"
              />
            )}
            {project.tracks.map((v, i) => (
              <TrackTag key={i} track={v} className="flex-shrink-0" />
            ))}
          </div>
          <div className="body-m-bold truncate text-neutral-off-black">
            {project.name}
          </div>
          <div className="body-s line-clamp-2 text-neutral-rich-gray">
            {project.introduction}
          </div>
        </div>
        <div className="caption-12pt flex text-neutral-rich-gray">
          <span>{project.hackathonName}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
