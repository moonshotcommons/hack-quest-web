import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import React, { useContext } from 'react';

interface JudgeInfoProp {}

const JudgeInfo: React.FC<JudgeInfoProp> = ({}) => {
  const { projectVote } = useContext(ProjectDetailContext);
  return (
    <div className="body-s flex flex-wrap gap-[1.5rem_2.5rem]  text-neutral-off-black">
      <div>
        <p className="text-neutral-medium-gray">Judging Mode</p>
        <p>{projectVote?.judge?.judgeMode === 'judges' ? 'Judges Only' : 'Users + Judges'}</p>
      </div>
      <div>
        <p className="text-neutral-medium-gray">Voting Mode</p>
        <p>{projectVote?.judge?.voteMode === 'fixed' ? 'Fixed Votes' : 'Project Scoring'}</p>
      </div>
      <div>
        <p className="text-neutral-medium-gray">Voting Track</p>
        <p>{projectVote?.judge?.rewardName}</p>
      </div>
    </div>
  );
};

export default JudgeInfo;
