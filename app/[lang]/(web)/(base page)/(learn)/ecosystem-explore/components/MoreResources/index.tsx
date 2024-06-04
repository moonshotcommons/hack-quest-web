'use client';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import MoreCover from '@/public/images/learn/more_resource_cpver.png';
import ResourceCard from './ResourceCard';
import { moreRoursesData } from '../../constants/data';

interface MoreResourcesProp {}

const MoreResources: React.FC<MoreResourcesProp> = ({}) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <DeveloperTitle image={MoreCover} title={'moreResources'} />
      <div className="flex flex-wrap items-stretch gap-[32px]">
        {moreRoursesData.map((resource, i) => (
          <div className="w-[calc((100%-64px)/3)]" key={i}>
            <ResourceCard resource={resource} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreResources;
