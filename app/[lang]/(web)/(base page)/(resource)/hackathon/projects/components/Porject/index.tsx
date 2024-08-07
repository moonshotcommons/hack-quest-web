import { ProjectDataType } from '@/service/webApi/resourceStation/type';
import ProjectCard from '@/components/Web/Business/ProjectCard';

export function ProjectList({ data }: { data: ProjectDataType }) {
  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-16">
      {data.data?.map((project) => <ProjectCard key={project.id} project={project} />)}
    </div>
  );
}
