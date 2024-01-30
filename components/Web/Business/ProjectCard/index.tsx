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
      className="flex flex-col rounded-[10px] overflow-hidden  bg-white w-[305px] hover:-translate-y-1 transition-all duration-300 mt-1 relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer"
      onClick={goProjectDetail}
    >
      <div className="h-0 w-full pt-[56%] relative bg-[#d9d9d9]/30">
        <Image
          src={project.thumbnail}
          alt="thumbnail"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="flex flex-col justify-between h-[215px] p-[16px]">
        <div className="w-full flex flex-col gap-[16px]">
          <div className="flex gap-[8px] w-full overflow-hidden">
            {project.apolloDay && (
              <TrackTag
                track={'Apollo Day'}
                className="bg-yellow-primary border-yellow-primary flex-shrink-0"
              />
            )}
            {project.tracks.map((v, i) => (
              <TrackTag key={i} track={v} className="flex-shrink-0" />
            ))}
          </div>
          <div className="text-neutral-off-black truncate body-m-bold">
            {project.name}
          </div>
          <div className="body-s text-neutral-rich-gray line-clamp-2">
            {project.introduction}
          </div>
        </div>
        <div className="flex text-neutral-rich-gray caption-12pt">
          <span>{project.hackathonName}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
