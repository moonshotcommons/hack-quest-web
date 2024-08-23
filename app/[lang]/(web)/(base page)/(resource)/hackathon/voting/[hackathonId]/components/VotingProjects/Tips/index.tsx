import React, { useContext } from 'react';
import { HackathonVoteContext } from '../../../../../constants/type';
import { CircleAlert } from 'lucide-react';

interface TipsProp {}

const Tips: React.FC<TipsProp> = () => {
  const { judgeInfo } = useContext(HackathonVoteContext);
  if (!judgeInfo?.judge?.rewardName) return null;
  return (
    <div className="body-m flex items-center justify-center gap-[8px] rounded-[16px] bg-yellow-extra-light py-[16px] text-neutral-off-black">
      <CircleAlert />
      <span>{`Your voting track is ‘${judgeInfo?.judge?.rewardName}’`}</span>
    </div>
  );
};

export default Tips;
