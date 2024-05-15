'use client';
import React, { FC } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import About from './About';
import HackathonInfo from './HackathonInfo';
import VotingRules from './VotingRules';
import VotingProjects from './VotingProjects';
import VoteProvider from './VoteProvider';

interface HackathonVotingProps {
  hackathon: HackathonType;
}

const HackathonVoting: FC<HackathonVotingProps> = ({ hackathon }) => {
  return (
    <div className="container mx-auto pb-[120px] pt-[40px]">
      <div className="min-h-[50vh] w-full">
        {hackathon.id && (
          <VoteProvider>
            <div className="flex justify-between">
              <div className="flex w-[58%] flex-col gap-[60px] [&>div]:w-full">
                <About hackathon={hackathon} />
                <VotingRules hackathon={hackathon} />
                <VotingProjects hackathon={hackathon} />
              </div>
              <div className="relative w-[39%]">
                <HackathonInfo hackathon={hackathon} />
              </div>
            </div>
          </VoteProvider>
        )}
      </div>
      <PageRetentionTime trackName="hackathon-detail-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default HackathonVoting;
