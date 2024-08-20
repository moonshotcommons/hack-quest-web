import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { HackathonEditContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
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
  const stepIndex = getStepIndex(hackathon);
  const { isEdit } = useContext(HackathonEditContext);
  const { data: rewards = [] } = useQuery({
    enabled: stepIndex === 2 && !isEdit,
    queryKey: ['hackathon-winner', stepIndex, isEdit],
    queryFn: () => webApi.resourceStationApi.getHackathonRewards(hackathon.id)
  });
  return rewards.length > 0 ? <Winners hackathon={hackathon} rewards={rewards} /> : <Reward hackathon={hackathon} />;
};

export default Rewards;
