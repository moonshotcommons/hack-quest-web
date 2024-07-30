import React, { useContext } from 'react';
import { ProjectDetailContext } from '../../../../../constants/type';

interface JudgeInfoProp {}

const JudgeInfo: React.FC<JudgeInfoProp> = ({}) => {
  const { projectVote } = useContext(ProjectDetailContext);
  return (
    <div className="body-s flex justify-between text-neutral-off-black">
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
