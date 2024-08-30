'use client';
import React from 'react';
import UserData from './UserData';
import MintData from './MintData';

interface EcosystemPresentationProp {
  ecosystemType: string;
}

const EcosystemPresentation: React.FC<EcosystemPresentationProp> = ({ ecosystemType }) => {
  return (
    <div className="container mx-auto flex h-full flex-col gap-[40px] p-[40px]">
      <UserData />
      <MintData />
    </div>
  );
};

export default EcosystemPresentation;
