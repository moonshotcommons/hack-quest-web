import React from 'react';
import { DashboardHeader } from '../dashboard/components/header';

interface HackathonVotingProp {}

const HackathonVoting: React.FC<HackathonVotingProp> = () => {
  return (
    <div className="container mx-auto pt-[48px]">
      <DashboardHeader />
    </div>
  );
};

export default HackathonVoting;
