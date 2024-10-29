import React, { useContext, useMemo } from 'react';
import {
  HackathonJudgeType,
  HackathonRewardType,
  HackathonType,
  HackathonDetailRewardType
} from '@/service/webApi/resourceStation/type';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import EditBox from '../EditBox';
import RewardCard from './RewardCard';
import WinnerCard from './WinnerCard';

interface RewardsProp {
  hackathon: HackathonType;
}

const Rewards: React.FC<RewardsProp> = ({ hackathon }) => {
  const { getStepIndex } = useDealHackathonData();
  const { isEdit } = useContext(HackathonEditContext);
  const stepIndex = getStepIndex(hackathon);
  const { data: rewards = [] } = useQuery({
    enabled: stepIndex === 4 && !isEdit,
    queryKey: ['hackathon-winner', stepIndex, isEdit],
    queryFn: () => webApi.resourceStationApi.getHackathonRewards(hackathon.id)
  });
  const hasWinner = useMemo(() => {
    return rewards.some((r) => r.projects?.length > 0);
  }, [rewards]);

  const renderReward = (judge: HackathonJudgeType) => {
    const hackathonReward = hackathon.rewards.find((r) => r.id === judge.id);
    const reward = rewards.find((r) => r.reward.id === judge.id);
    if (!hasWinner || judge.disableJudge || !reward?.projects?.length) {
      return <RewardCard reward={hackathonReward as HackathonRewardType} />;
    }
    return <WinnerCard reward={reward as HackathonDetailRewardType} />;
  };
  return (
    <EditBox
      title={'hackathonDetail.rewards'}
      className="flex  flex-col gap-8 rounded-[0] border-none bg-transparent p-0"
      type={HackathonEditModalType.REWARDS}
    >
      {hackathon.judge.map((j) => (
        <React.Fragment key={j.id}>{renderReward(j)}</React.Fragment>
      ))}
    </EditBox>
  );
};

export default Rewards;
