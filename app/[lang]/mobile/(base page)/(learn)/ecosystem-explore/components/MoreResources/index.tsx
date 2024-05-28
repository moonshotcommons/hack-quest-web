import { Lang } from '@/i18n/config';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import MoreCover from '@/public/images/learn/more_resource_cpver.png';
import ResourceCard from './ResourceCard';
import MenuLink from '@/constants/MenuLink';

interface MoreResourcesProp {
  lang: Lang;
}

const MoreResources: React.FC<MoreResourcesProp> = ({ lang }) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <DeveloperTitle lang={lang} image={MoreCover} title={'moreResources'} />
      <div className="flex flex-wrap items-stretch gap-[32px]">
        <ResourceCard lang={lang} type="glossary" link={MenuLink.GLOSSARY} />
        <ResourceCard lang={lang} type="hackathon" link={MenuLink.HACKATHON} />
        <ResourceCard lang={lang} type="blog" link={MenuLink.BLOG} />
      </div>
    </div>
  );
};

export default MoreResources;
