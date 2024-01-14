import { Metadata } from 'next';
import PageDescription from '@/components/Web/Business/PageDescription';
import ProjectsPageBox from '../../components/ProjectsBox';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

interface ProjectsPageProps {
  params: { slug: string[] };
  searchParams: { keyword: string } & Record<string, string>;
}

export const metadata: Metadata = {
  title: 'Project Archive | HackQuest',
  description:
    'Welcome to the central repository for accessing all previous projects from our various hackathons.'
};

async function ProjectsPage({
  params: { slug = [] },
  searchParams
}: ProjectsPageProps) {
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;

  return (
    <div className="h-full overflow-auto">
      <div className="container mx-auto">
        <PageDescription
          title={'Project Archive'}
          description={
            'Welcome to the central repository for accessing all previous projects from our various hackathons.'
          }
          className="pt-0"
        />

        <ProjectsPageBox searchParams={searchParams} page={page} />
      </div>
      <PageRetentionTime trackName="hackathon-all-projects-页面留存时间" />
    </div>
  );
}

export default ProjectsPage;
