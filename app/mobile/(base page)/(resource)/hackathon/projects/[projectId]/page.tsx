import { Metadata } from 'next';
import { FC } from 'react';
import ProjectDetail from '../../components/ProjectDetail';
import FeaturedProjects from '../../components/FeaturedProject';
import {
  getFeaturedProjects,
  getHackathonProjectById
} from '@/service/hackathon';
import webApi from '@/service';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

export async function generateMetadata({
  params
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getHackathonProjectById(params.projectId);
  return {
    title: project.hackathonName,
    description: project.description
  };
}

const ProjectDetailPage: FC<ProjectDetailPageProps> = async function ({
  params
}) {
  // load project detail
  const { projectId } = params;
  const project = await getHackathonProjectById(params.projectId);

  // load other projects
  const otherProjects = await webApi.resourceStationApi.getProjectsList({
    keyword: project.hackathonName
    // page: page,
    // limit: PROJECTS_LIMIT
  });
  const others = otherProjects.data.filter(
    (project) => project.id !== projectId
  );

  // load featured projects
  const featured = await getFeaturedProjects(projectId);

  return (
    <div>
      <div className="container mx-auto">
        {projectId && (
          <ProjectDetail project={project} others={others}></ProjectDetail>
        )}
      </div>
      <div className="mt-[80px]">
        <FeaturedProjects projects={featured}></FeaturedProjects>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
