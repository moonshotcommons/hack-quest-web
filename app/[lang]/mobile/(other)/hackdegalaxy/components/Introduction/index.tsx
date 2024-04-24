import React from 'react';
import CentralTitle from '../CentralTitle';
import { introductionText } from '@/app/[lang]/(web)/(other)/hackdegalaxy/constants/data';

interface IntroductionProp {}

const Introduction: React.FC<IntroductionProp> = () => {
  return (
    <div>
      <CentralTitle title="INTRODUCTION" />
      <div className="flex flex-col gap-[1.875rem] text-[.875rem] text-neutral-off-white">
        {introductionText.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
      </div>
    </div>
  );
};

export default Introduction;
