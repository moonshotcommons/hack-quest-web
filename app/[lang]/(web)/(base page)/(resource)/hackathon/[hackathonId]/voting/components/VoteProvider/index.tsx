'use client';
import React, { ReactNode, useState } from 'react';
import { HackathonVoteContext, ViewValue } from '../../../../constants/type';

interface VoteProviderProp {
  children: ReactNode;
}

const VoteProvider: React.FC<VoteProviderProp> = ({ children }) => {
  const [voteData, setVoteData] = useState(0);
  const [view, setView] = useState(ViewValue.AGENDA);
  return (
    <HackathonVoteContext.Provider
      value={{
        voteData,
        setVoteData,
        view,
        setView
      }}
    >
      {children}
    </HackathonVoteContext.Provider>
  );
};

export default VoteProvider;
