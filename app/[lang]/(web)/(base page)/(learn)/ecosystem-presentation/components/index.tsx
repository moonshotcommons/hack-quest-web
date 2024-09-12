'use client';
import React from 'react';
import UserData from './UserData';
import MintData from './MintData';
import { EcosystemDetailType, EcosystemStatsType } from '@/service/webApi/ecosystem/type';

interface EcosystemPresentationProp {
  ecosystemId: string;
  ecosystemData: EcosystemStatsType;
  ecosystemInfo: EcosystemDetailType;
}

const EcosystemPresentation: React.FC<EcosystemPresentationProp> = ({ ecosystemId, ecosystemData, ecosystemInfo }) => {
  return (
    <div className="container mx-auto flex h-full flex-col gap-[20px] px-[40px] py-[20px]">
      <UserData ecosystemData={ecosystemData} ecosystemInfo={ecosystemInfo} />
      <MintData ecosystemId={ecosystemId} />
    </div>
  );
};

export default EcosystemPresentation;
