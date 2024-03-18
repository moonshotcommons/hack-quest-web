'use client';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import { FC } from 'react';
import InfoBlock from './InfoBloack';
import OtherProjects from './OtherProjects';
import Video from './Video';
interface ProjectDetailProps {
  project: ProjectType;
  others: ProjectType[];
}

const ProjectDetail: FC<ProjectDetailProps> = (props) => {
  const { project, others } = props;

  return (
    <div className="min-h-[50vh] w-full">
      {project && (
        <div className="flex justify-between gap-x-[80px]">
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-x-[15px]">
              <div className="relative flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[10px] bg-gray-300">
                <Image
                  src={project.thumbnail}
                  width={48}
                  height={48}
                  alt={project.alias}
                  className="object-cover"
                ></Image>
              </div>
              <h1 className="text-h2">{project.name}</h1>
            </div>
            <p className="body-l mt-[8px]">{project.description}</p>
            <Video project={project} />
            <p className="body-l mt-[30px] opacity-[0.6]">
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
