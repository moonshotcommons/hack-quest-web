import React from 'react';
import CentralTitle from '../CentralTitle';
import { introductionText } from '../../constants/data';

interface IntroductionProp {}

const Introduction: React.FC<IntroductionProp> = () => {
  return (
    <div>
      <CentralTitle title="INTRODUCTION" />
      <div className="flex flex-col gap-[36px] text-[16px] text-neutral-off-white">
        {introductionText.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
      </div>
    </div>
  );
};

export default Introduction;
