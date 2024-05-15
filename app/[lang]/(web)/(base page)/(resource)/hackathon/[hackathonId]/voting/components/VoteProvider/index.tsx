'use client';
import React, { ReactNode, useState } from 'react';
import { HackathonVoteContext } from '../../../../constants/type';

interface VoteProviderProp {
  children: ReactNode;
}

const VoteProvider: React.FC<VoteProviderProp> = ({ children }) => {
  const [voteData, setVoteData] = useState(0);
  return (
    <HackathonVoteContext.Provider
      value={{
        voteData,
        setVoteData
      }}
    >
      {children}
    </HackathonVoteContext.Provider>
  );
};

export default VoteProvider;
