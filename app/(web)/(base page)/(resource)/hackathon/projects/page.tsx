import React from 'react';
import ProjectIndex from './pageIndex';
import { Metadata } from 'next';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface ProjectPageProp {
  searchParams: Record<string, string>;
}

export async function generateMetadata({
  searchParams
}: ProjectPageProp): Promise<Metadata> {
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const metadata: Metadata = {
    title: 'All Projects - Hackathons',
    alternates: {
      canonical: `https://www.hackquest.io${MenuLink.PROJECTS}${query}`
    }
  };

  return metadata;
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
