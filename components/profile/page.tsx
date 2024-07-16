'use client';

import * as React from 'react';
import { BasicInfo } from './modules/basic-info';
import { BuilderScore } from './modules/builder-score';
import { Certification } from './modules/certification';
import { DeveloperProfile } from './modules/developer-profile';
import { OnChainActivity } from './modules/on-chain-activity';
import { Experience } from './modules/experience';
import { Hackathon } from './modules/hackathon';
import { Resume } from './modules/resume';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { PROFILE_QUERY_KEY } from './utils';
import { CompleteProfile } from './modules/complete-profile';

export default function Page() {
  useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    staleTime: Infinity,
    queryFn: () => webApi.userApi.getUserProfile()
  });

  return (
    <div className="h-full w-full bg-neutral-white">
      <BasicInfo />
      <div className="mt-2 sm:mx-auto sm:mt-[88px] sm:max-w-5xl">
        <CompleteProfile />
        <BuilderScore />
        <div className="mt-2 grid grid-cols-1 gap-2 sm:mt-12 sm:grid-cols-2 sm:gap-8">
          <DeveloperProfile />
          <OnChainActivity />
        </div>
        <Certification />
        <Resume />
        <Experience />
        <Hackathon />
      </div>
    </div>
  );
}
