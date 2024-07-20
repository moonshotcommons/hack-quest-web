'use client';
import React, { ReactNode, useState } from 'react';
import { HackathonVoteContext, ViewValue, VoteDataType } from '../../../../constants/type';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';

interface VoteProviderProp {
  children: ReactNode;
  hackathon: HackathonType;
}

const VoteProvider: React.FC<VoteProviderProp> = ({ children, hackathon }) => {
  const [voteData, setVoteData] = useState<VoteDataType[]>([]);
  const [view, setView] = useState(ViewValue.AGENDA);
  const [initProjects, setInitProjects] = useState<ProjectType[]>([]);
  const [remainingVotes, setRemainingVotes] = useState(0);
  const [totalLeftVotes, setTotalLeftVotes] = useState(0);
  const [isFixedVote, setIsFixedVote] = useState(false);
  return (
    <HackathonVoteContext.Provider
      value={{
        voteData,
        setVoteData,
        view,
        setView,
        initProjects,
        setInitProjects,
        remainingVotes,
        setRemainingVotes,
        hackathon,
        isFixedVote,
        setIsFixedVote,
        totalLeftVotes,
        setTotalLeftVotes
      }}
    >
      {children}
    </HackathonVoteContext.Provider>
  );
};

export default VoteProvider;
