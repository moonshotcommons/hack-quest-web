'use client';
import React, { ReactNode, useState } from 'react';
import { HackathonVoteContext, ViewValue, VoteDataType } from '../../../../constants/type';
import { HackathonType, HackathonVoteJudgeType } from '@/service/webApi/resourceStation/type';

interface VoteProviderProp {
  children: ReactNode;
  hackathon: HackathonType;
}

const VoteProvider: React.FC<VoteProviderProp> = ({ children, hackathon }) => {
  const [voteData, setVoteData] = useState<VoteDataType[]>([]);
  const [view, setView] = useState(ViewValue.AGENDA);
  const [remainingVotes, setRemainingVotes] = useState(0);
  const [totalLeftVotes, setTotalLeftVotes] = useState(0);
  const [judgeInfo, setJudgeInfo] = useState<HackathonVoteJudgeType>({} as HackathonVoteJudgeType);
  return (
    <HackathonVoteContext.Provider
      value={{
        voteData,
        setVoteData,
        view,
        setView,
        remainingVotes,
        setRemainingVotes,
        hackathon,
        totalLeftVotes,
        setTotalLeftVotes,
        judgeInfo,
        setJudgeInfo
      }}
    >
      {children}
    </HackathonVoteContext.Provider>
  );
};

export default VoteProvider;
