import { ProjectType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import { FC } from 'react';
import InfoBlock from './InfoBloack';
import OtherProjects from './OtherProjects';
import ProjectVideo from './Video';
interface ProjectDetailProps {
  project: ProjectType;
  others: ProjectType[];
}

const ProjectDetail: FC<ProjectDetailProps> = async ({ project, others }) => {
  return (
    <div className="w-full min-h-[50vh]">
      {project && (
        <div className="flex justify-between gap-x-[80px]">
          <div className="flex flex-col flex-1">
            <div className="flex gap-x-[15px] items-center">
              <div className="w-[48px] h-[48px] bg-gray-300 rounded-[10px] relative overflow-hidden flex items-center justify-center">
                <Image
                  src={project.thumbnail}
                  width={48}
                  height={48}
                  alt="thumbnail"
                  className="object-cover"
                ></Image>
              </div>
              <h1 className="font-next-poster-Bold text-[40px] tracking-[2.4px]">
                {project.name}
              </h1>
            </div>
            <p className="mt-[8px] font-next-book text-[21px] leading-[160%] tracking-[0.42px]">
              {project.description}
            </p>
            <ProjectVideo project={project} />
            <p className="mt-[30px] font-next-book text-[18px] leading-[160%] tracking-[0.36px] opacity-[0.6]">
              {`${project.hackathonName} · ${project.tracks.join(' · ')}`}
            </p>
            <div className="mt-[30px]">
              <InfoBlock
                title="Introduction"
                description={project.introduction}
              ></InfoBlock>
            </div>
            <div>
              <InfoBlock title="Team" description={project.team}></InfoBlock>
            </div>
          </div>
          <div>
            <OtherProjects
              hackathonName={project.hackathonName}
              projects={others}
            ></OtherProjects>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
