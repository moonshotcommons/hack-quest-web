import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import Label from '@/components/Common/Label';
import { computeTime } from '@/helper/formate';
import { Typography } from 'antd';
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
        className={`w-full h-full bg-concept-card-bg scale-[1.01] absolute top-0 left-0 hover:-top-1 hover:left-1 hover:transition-all duration-700`}
      >
        <div
          className="absolute top-6 left-4 w-full h-full p-4 bg-no-repeat"
          style={{ backgroundImage: `url(${cover})` }}
        ></div>
        <div className="pl-10 pr-4 pt-9 h-full">
          <div className="w-[2.875rem] h-1 rounded-xl bg-gradient-to-t from-[#EB3E1C] to-[#E0AD38]"></div>
          <div className="flex justify-between h-full">
            <h2 className="title mt-36">
              <Typography.Paragraph
                className="text-card-title-text-color font-next-book-bold font-bold text-base w-[9.125rem]"
                ellipsis={{ rows: 3 }}
                style={{ marginBottom: 0 }}
              >
                {title}
              </Typography.Paragraph>
            </h2>
            <Label
              icon={<ClockIcon color="#f2f2f2" />}
              className="mt-10 font-neuemachina-light self-end mb-4 mr-16"
            >
              {computeTime(duration, 'Hour')}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptLearningCard;
