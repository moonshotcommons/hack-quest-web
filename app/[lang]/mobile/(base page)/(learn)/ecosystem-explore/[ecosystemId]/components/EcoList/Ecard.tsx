import React from 'react';
import DeveloperCard from '../../../components/DeveloperCard';
import Title from '../Title';

interface EcardProp {}

const Ecard: React.FC<EcardProp> = ({}) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <Title
        title="Solana Developer 101"
        description="Follow the course to deploy the first project on Solana ecosystem"
      />
      <DeveloperCard />
    </div>
  );
};

export default Ecard;
