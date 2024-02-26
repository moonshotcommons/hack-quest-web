import { FC } from 'react';
import LearningTrackCard from './LearningTrackCard';
import webApi from '@/service';

interface BecomeSolidityDeveloperProps {}

const BecomeSolidityDeveloper: FC<BecomeSolidityDeveloperProps> = async (
  props
) => {
  const learningTrack = await webApi.learningTrackApi.getLearningTrackDetail(
    '6d108f0d-dfb2-4dad-8f38-93b45573bc43'
  );
  return (
    <div className="container mx-auto flex max-w-[77.5rem] flex-col items-center gap-8 text-center">
      <h3 className="text-[48px] font-medium leading-[110%] -tracking-[1.92px] text-white">
        Become a Solidity Developer
      </h3>
      <p className="w-[53.6875rem] text-[1.375rem] leading-[140%] text-[#C4C4C4]">
        {`Don't know where to start? Pick a learning track! Leaning Track provides a series of core + elective courses that help you master one topic and explore in the related field.`}
      </p>
      <LearningTrackCard learningTrack={learningTrack} />
    </div>
  );
};

export default BecomeSolidityDeveloper;
