import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { HackathonEditContext } from '../../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import Winners from './Winners';
import Reward from './Reward';

interface RewardsProp {
  hackathon: HackathonType;
}

const Rewards: React.FC<RewardsProp> = ({ hackathon }) => {
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  const { isEdit } = useContext(HackathonEditContext);
  return !isEdit && stepIndex === 2 ? <Winners hackathon={hackathon} /> : <Reward hackathon={hackathon} />;
};

export default Rewards;
