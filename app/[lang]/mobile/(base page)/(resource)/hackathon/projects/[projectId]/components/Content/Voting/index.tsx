import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo } from 'react';

import Title from '../../Title';
import VotingInfo from './VotingInfo';
import YourVotes from './YourVotes';
import YourVoteRole from './YourVoteRole';
import YourTotalVotes from './YourTotalVotes';
import VoteMsg from './VoteMsg';
import dayjs from '@/components/Common/Dayjs';
import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import Rewards from './Rewards';
import JudgeInfo from './JudgeInfo';

interface VotingProp {}

const Voting: React.FC<VotingProp> = ({}) => {
  const { project, hackathon, projectVote, titleTxtData } = useContext(ProjectDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const isEnd = useMemo(() => {
    return dayjs().tz().isAfter(hackathon?.timeline?.rewardTime);
  }, [hackathon]);
  if (!titleTxtData.includes('projectsDetail.title.voting')) return null;
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <Title
        title={`${t('projectsDetail.title.votingFor', {
          name: project.name
        })} `}
      />

      {!isEnd ? (
        projectVote.isJudge ? (
          <div className="flex w-full flex-col gap-[1.5rem]">
            <JudgeInfo />
            <YourVoteRole />
            <YourTotalVotes />
            <div className="w-full border-b border-neutral-medium-gray"></div>
            <VotingInfo />
            <YourVotes />
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
