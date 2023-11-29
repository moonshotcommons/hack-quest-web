import React from 'react';
import Image from 'next/image';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import { ProjectType } from '@/service/webApi/resourceStation/project/type';
import { useRouter } from 'next/router';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';

interface ProjectCardProp {
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProp> = ({ project }) => {
  const router = useRouter();
  const goProjectDetail = () => {
    BurialPoint.track(`hackathon projectCard 点击`);
    router.push(
      `${menuLink.projects}/projects/${project.id}?${QueryIdType.PROJECT_ID}=${project.id}&menu=${Menu.PROJECTS}`
    );
  };
  return (
    <div
      className="flex flex-col rounded-[10px] overflow-hidden  h-[333px] bg-white w-[305px] hover:-translate-y-1 transition-all duration-300 mt-1 relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer"
      onClick={goProjectDetail}
    >
      <div className="h-[163px] bg-[#d9d9d9]/30 relative">
        <Image
          src={project.thumbnail}
          alt="thumbnail"
          fill
          className="object-cover"
        ></Image>
        {project.apolloDay && (
          <div className="absolute left-[10px] top-[10px] px-[14px] h-[25px] bg-[#fff] text-[#3E3E3E] text-[12px] flex items-center rounded-[10px]">
            Apollo Day
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between px-[20px] pt-[10px] pb-[20px]">
        <div className="w-full">
          <div className="text-[rgba(11,11,11,0.6)] text-[16px] flex items-center text-ellipsis overflow-hidden whitespace-nowrap">
            {project.tracks.map((v, i) => (
              <React.Fragment key={i}>
                <span>{v}</span>
                {i < project.tracks.length - 1 && (
                  <span className="w-[4px] mx-[6px] h-[4px] rounded-[50%] bg-[rgba(11,11,11,0.6)]"></span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-[#000] text-[18px] font-next-book-bold pt-[3px]">
            {project.name}
          </div>
        </div>
        <div className="font-next-book-Thin line-clamp-3 h-[66px]">
          {project.introduction}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
