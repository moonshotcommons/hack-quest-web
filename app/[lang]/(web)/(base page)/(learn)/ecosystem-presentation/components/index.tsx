'use client';
import React from 'react';
import UserData from './UserData';
import MintData from './MintData';
import { ecosystemStatsType } from '@/service/webApi/ecosystem/type';

interface EcosystemPresentationProp {
  ecosystemId: string;
  ecosystemData: ecosystemStatsType;
}

const EcosystemPresentation: React.FC<EcosystemPresentationProp> = ({ ecosystemId, ecosystemData }) => {
  return (
    <div className="container mx-auto flex h-full flex-col gap-[40px] p-[40px]">
      <UserData ecosystemData={ecosystemData} />
      <MintData ecosystemId={ecosystemId} />
    </div>
  );
};

export default EcosystemPresentation;
