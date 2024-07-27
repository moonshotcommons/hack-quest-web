import CountDown from '@/components/Web/Business/CountDown';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

interface VoteCloseInProp {}

const VoteCloseIn: React.FC<VoteCloseInProp> = () => {
  const { hackathon } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  return (
    <div className="body-m relative flex justify-center rounded-[8px] bg-yellow-extra-light px-[16px] py-[8px] text-neutral-medium-gray">
      <span className="absolute left-[16px] top-0 flex h-full items-center">Voting Close in</span>
      <CountDown time={hackathon?.timeline?.rewardTime || ''} countItemClassName="bg-yellow-primary" />
    </div>
  );
};

export default VoteCloseIn;
