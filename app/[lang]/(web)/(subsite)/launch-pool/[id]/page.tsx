import React from 'react';
import LaunchDetailPage from './components';
import { LaunchPoolProjectType } from '@/service/webApi/launchPool/type';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import webApi from '@/service';
import { Metadata } from 'next';

interface LaunchDetailProp {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params
}: LaunchDetailProp): Promise<Metadata> {
  const project: LaunchPoolProjectType =
    await webApi.launchPoolApi.getProjectById(params.id);
  return {
    title: project.name,
    alternates: {
      canonical: `https://www.hackquest.io/${MenuLink.LAUNCH}/${params.id}`
    }
  };
}

const LaunchDetail: React.FC<LaunchDetailProp> = async ({ params }) => {
  return <LaunchDetailPage id={params.id} />;
};

export default LaunchDetail;
