import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';

import { ProjectDetailContext } from '../../../../../constants/type';
import Title from '../../Title';
import VotingInfo from './VotingInfo';
import YourVotes from './YourVotes';
import YourVoteRole from './YourVoteRole';
import YourTotalVotes from './YourTotalVotes';
import VoteMsg from './VoteMsg';

interface VotingProp {
  project: ProjectType;
}

const Voting: React.FC<VotingProp> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { titleTxtData } = useContext(ProjectDetailContext);

  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={`${t(titleTxtData[1])} for ${project.name}`} />
      {false ? (
        <div className="flex w-full">
          <div className="flex-1 border-r border-neutral-medium-gray pr-[40px] ">
            <VotingInfo project={project} />
            <YourVotes project={project} />
          </div>
          <div className="flex flex-1 flex-col justify-between pl-[40px]">
            <YourVoteRole project={project} />
            <YourTotalVotes project={project} />
          </div>
        </div>
      ) : (
        <VoteMsg project={project} />
      )}
    </div>
  );
};

export default Voting;
