import React from 'react';
import LaunchDetailPage from './components';
import { LaunchPoolProjectType } from '@/service/webApi/launchPool/type';
import MenuLink from '@/constants/MenuLink';
import webApi from '@/service';
import { Metadata } from 'next';

interface LaunchDetailProp {
  params: {
    id: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: LaunchDetailProp): Promise<Metadata> {
  const project: LaunchPoolProjectType = await webApi.launchPoolApi.getProjectById(params.id);
  const { lang } = params;
  return {
    title: project.name,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/${MenuLink.LAUNCH}/${params.id}`
    }
  };
}

const LaunchDetail: React.FC<LaunchDetailProp> = async ({ params }) => {
  return <LaunchDetailPage id={params.id} />;
};

export default LaunchDetail;
