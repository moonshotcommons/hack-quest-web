import React, { useContext, useMemo } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { HackathonEditContext } from '../../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import Winners from './Winners';
import Reward from './Reward';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';

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
  return hasWinner ? <Winners hackathon={hackathon} rewards={rewards} /> : <Reward hackathon={hackathon} />;
};

export default Rewards;
