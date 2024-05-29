'use client';
import React, { FC } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import HackathonInfo from './HackathonInfo';
import VotesData from './VotesData';
import VotingRules from './VotingRules';
import VotingProjects from './VotingProjects';
import VoteProvider from './VoteProvider';
import Footer from './Footer';
import HackathonImage from './HackathonImage';

interface HackathonVotingProps {
  hackathon: HackathonType;
  otherHackathons: HackathonType[];
}

const HackathonVoting: FC<HackathonVotingProps> = ({ hackathon, otherHackathons }) => {
  return (
    <div className="p-[1.25rem]">
      <div className="relative min-h-[40vh] w-full">
        {hackathon.id && (
          <VoteProvider>
            <div className="flex flex-col gap-[3.75rem]">
              <HackathonImage hackathon={hackathon} />
              <HackathonInfo hackathon={hackathon} />
              <VotesData hackathon={hackathon} />
              <VotingRules hackathon={hackathon} />
              <VotingProjects hackathon={hackathon} />
            </div>
            <Footer otherHackathons={otherHackathons} />
          </VoteProvider>
        )}
      </div>

      <PageRetentionTime trackName="hackathon-detail-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default HackathonVoting;
