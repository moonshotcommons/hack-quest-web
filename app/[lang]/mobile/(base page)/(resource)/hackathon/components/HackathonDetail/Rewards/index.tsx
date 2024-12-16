import React, { useContext, useMemo } from 'react';
import {
  HackathonDetailRewardType,
  HackathonJudgeType,
  HackathonRewardType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import {
  HackathonEditContext,
  HackathonEditModalType
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import RewardCard from './RewardCard';
import WinnerCard from './WinnerCard';
import EditBox from '../EditBox';

interface RewardsProp {
  hackathon: HackathonType;
}

const Rewards: React.FC<RewardsProp> = ({ hackathon }) => {
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  const { isEdit } = useContext(HackathonEditContext);
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
    if (!hasWinner) {
      return <RewardCard reward={hackathonReward as HackathonRewardType} />;
    }

    return <WinnerCard judge={judge} reward={reward as HackathonDetailRewardType} />;
  };
  return (
    <EditBox
      title={'hackathonDetail.rewards'}
      className="flex flex-col gap-6 rounded-[0] border-none bg-transparent p-0"
      type={HackathonEditModalType.REWARDS}
    >
      {hackathon.judge.map((j) => (
        <React.Fragment key={j.id}>{renderReward(j)}</React.Fragment>
      ))}
    </EditBox>
  );
};

export default Rewards;
