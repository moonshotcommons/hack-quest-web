import ProjectsPageBox from '@/components/v2/ProjectsBox';
import PageDescription from '@/components/v2/PageDescription';
import { useRef, useState } from 'react';

function ProjectsPage() {
  const ProjectsPageRef = useRef<HTMLDivElement | null>(null);

  const [loadNum, setLoadNum] = useState(0);
  const [apiStatus, setApiStatus] = useState('init');

  const handleScroll = () => {
    if (apiStatus !== 'init') return;
    const clientHeight = ProjectsPageRef.current?.clientHeight || 0;
    const scrollTop = ProjectsPageRef.current?.scrollTop || 0;
    const scrollHeight = ProjectsPageRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setLoadNum((num) => num + 1);
    }
  };
  return (
    <div
      className="h-[calc(100vh-114px)] overflow-auto"
      onScroll={handleScroll}
      ref={ProjectsPageRef}
    >
      <div className="container mx-auto ">
        <PageDescription
          title={'Project Archive'}
          description={
            'Welcome to the central repository for accessing all previous projects from our various hackathons.'
          }
          className="pt-0"
        />

        <ProjectsPageBox
          loadNum={loadNum}
          setApiStatus={(status) => setApiStatus(status)}
          apiStatus={apiStatus}
        />
      </div>
    </div>
  );
}

export default ProjectsPage;
