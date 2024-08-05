import React, { useContext } from 'react';
import { CircleAlert } from 'lucide-react';
import { HackathonVoteContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface TipsProp {}

const Tips: React.FC<TipsProp> = () => {
  const { judgeInfo } = useContext(HackathonVoteContext);
  return (
    <div className="body-s flex items-center justify-center gap-[.5rem] rounded-[1rem] bg-yellow-extra-light py-[.75rem] text-neutral-off-black">
      <CircleAlert size={14} />
      <span>{`Your voting track is ‘${judgeInfo?.judge?.rewardName}’`}</span>
    </div>
  );
};

export default Tips;
