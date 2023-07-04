import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import Label from '@/components/Common/Label';
import { computeTime } from '@/helper/utils';
import React from 'react';
export interface ConceptLearningCardProps {
  title: string;
  tags: string | string[];
  description: string;
  duration: number;
  unitCount: number;
  progress: number;
  cover: string;
}

const ConceptLearningCard: React.FC<ConceptLearningCardProps> = (props) => {
  const {
    title,
    tags = [],
    description,
    duration,
    unitCount,
    progress,
    cover
  } = props;

  return (
    <div
      className={`h-[17.375rem] w-[26rem] bg-[url('/images/card/ConceptLearning/color-bg.svg')] relative flex-shrink-0`}
    >
      <div
        className={`w-full h-full bg-[url('/images/card/ConceptLearning/bg.svg')] scale-[1.01] absolute top-0 left-0 hover:-top-1 hover:left-1 relative hover:transition-all duration-700`}
      >
        <div
          className="absolute top-6 left-4 w-full h-full p-4 bg-no-repeat"
          style={{ backgroundImage: `url(${cover})` }}
        ></div>
        <div className="pl-10 pr-4 pt-9">
          <div className="w-[2.875rem] h-1 rounded-xl bg-gradient-to-t from-[#EB3E1C] to-[#E0AD38]"></div>
          <h2 className="title mt-36">{title}</h2>
          <Label
            icon={<ClockIcon color="#f2f2f2" />}
            className="ml-56 mt-10 font-neuemachina"
          >
            {computeTime(duration, 'Hour')} Hour
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ConceptLearningCard;
