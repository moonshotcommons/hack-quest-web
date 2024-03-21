import React from 'react';
import ProjectIndex from './pageIndex';

interface ProjectPageProp {
  searchParams: Record<string, string>;
}

const ProjectPage: React.FC<ProjectPageProp> = (props) => {
  return (
    <>
      <div className="absolute hidden">{props.searchParams?.keyword}</div>
      <ProjectIndex />
    </>
  );
};

export default ProjectPage;
