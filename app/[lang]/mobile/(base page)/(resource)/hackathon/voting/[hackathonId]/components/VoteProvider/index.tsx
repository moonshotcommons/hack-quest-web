'use client';
import React, { ReactNode, useState } from 'react';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import {
  HackathonVoteContext,
  ViewValue,
  VoteDataType
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface VoteProviderProp {
  children: ReactNode;
}

const VoteProvider: React.FC<VoteProviderProp> = ({ children }) => {
  const [voteData, setVoteData] = useState<VoteDataType[]>([]);
  const [view, setView] = useState(ViewValue.AGENDA);
  const [initProjects, setInitProjects] = useState<ProjectType[]>([]);
  const [remainingVotes, setRemainingVotes] = useState(0);
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
        setRemainingVotes
      }}
    >
      {children}
    </HackathonVoteContext.Provider>
  );
};

export default VoteProvider;
