'use client';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import MoreCover from '@/public/images/learn/more_resource_cpver.png';
import ResourceCard from './ResourceCard';
import { moreRoursesData } from '@/app/[lang]/(web)/(base page)/(learn)/ecosystem-explore/constants/data';

interface MoreResourcesProp {}

const MoreResources: React.FC<MoreResourcesProp> = ({}) => {
  return (
    <div className="flex flex-col gap-[1.25rem]">
      <DeveloperTitle image={MoreCover} title={'moreResources'} />
      <div className="flex flex-col  gap-[1.25rem]">
        {moreRoursesData.map((resource, i) => (
          <div className="w-full" key={i}>
            <ResourceCard resource={resource} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreResources;
