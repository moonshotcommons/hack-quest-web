import React from 'react';
import Image from 'next/image';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '../../Layout/BasePage/Navbar/type';
import TrackTag from '@/components/Common/TrackTag';

interface ProjectCardProp {
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProp> = ({ project }) => {
  const { redirectToUrl } = useRedirect();
  const goProjectDetail = () => {
    BurialPoint.track(`hackathon projectCard 点击`);
    redirectToUrl(
      `${MenuLink.PROJECTS}/${project.id}?${QueryIdType.PROJECT_ID}=${project.id}&menu=${Menu.HACKATHON}`
    );
  };
  return (
    <div
      className="relative mt-1 flex w-[305px]  cursor-pointer flex-col overflow-hidden rounded-[10px] bg-neutral-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
      onClick={goProjectDetail}
    >
      <div className="relative h-0 w-full bg-[#d9d9d9]/30 pt-[56%]">
        <Image
          src={project.thumbnail}
          alt="thumbnail"
          fill
          className="object-cover"
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
    </div>
  );
};

export default ProjectCard;
