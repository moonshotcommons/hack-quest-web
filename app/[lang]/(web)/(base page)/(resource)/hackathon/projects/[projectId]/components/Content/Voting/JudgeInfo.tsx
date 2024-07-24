import { ProjectType } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface JudgeInfoProp {
  project: ProjectType;
}

const JudgeInfo: React.FC<JudgeInfoProp> = ({ project }) => {
  console.info(project);
  return (
    <div className="body-s flex justify-between text-neutral-off-black">
      <div>
        <p className="text-neutral-medium-gray">Judging Mode</p>
        {/* <p>{judgeInfo?.judge?.judgeMode === 'judges' ? 'Judges Only' : 'Users + Judges'}</p> */}
        <p>{'Users + Judges'}</p>
      </div>
      <div>
        <p className="text-neutral-medium-gray">Voting Mode</p>
        {/* <p>{judgeInfo?.judge?.voteMode === 'fixed' ? 'Fixed Votes' : 'Project Scoring'}</p> */}
        <p>{'Project Scoring'}</p>
      </div>
      <div>
        <p className="text-neutral-medium-gray">Voting Track</p>
        {/* <p>{judgeInfo?.judge?.rewardName}</p> */}
        <p>{'rewardName'}</p>
      </div>
    </div>
  );
};

export default JudgeInfo;
