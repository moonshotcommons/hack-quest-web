import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';

import Title from '../../Title';
import VotingInfo from './VotingInfo';
import YourVotes from './YourVotes';
import YourVoteRole from './YourVoteRole';
import YourTotalVotes from './YourTotalVotes';
import VoteMsg from './VoteMsg';
import JudgeInfo from './JudgeInfo';
import { ProjectDetailContext } from '../../../../../constants/type';
import Rewards from './Rewards';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface VotingProp {}

const Voting: React.FC<VotingProp> = ({}) => {
  const { project, hackathon, projectVote, titleTxtData } = useContext(ProjectDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  if (!titleTxtData.includes('projectsDetail.title.voting')) return null;
  return (
    <div className="flex flex-col gap-[32px]">
      <Title
        title={`${t('projectsDetail.title.votingFor', {
          name: project.name
        })} `}
      />
      {stepIndex === 3 ? (
        projectVote.isJudge ? (
          <div className="flex w-full items-stretch">
            <div className="flex flex-1 flex-col gap-[10px] border-r border-neutral-medium-gray pr-[40px] ">
              <VotingInfo />
              <YourVotes />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-[20px] pl-[40px]">
              <JudgeInfo />
              <YourVoteRole />
              <YourTotalVotes />
            </div>
          </div>
        ) : (
          <VoteMsg />
        )
      ) : (
        <Rewards />
      )}
    </div>
  );
};

export default Voting;
