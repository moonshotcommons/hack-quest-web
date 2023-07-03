import Button from '@/components/Button';
import ClockIcon from '@/components/Icon/Clock';
import CompletedIcon from '@/components/Icon/Completed';
import CourseIcon from '@/components/Icon/Course';
import Label from '@/components/Label';
import Tag from '@/components/Tag';
import { computeTime } from '@/helper/utils';
import React from 'react';

export interface LearningTracksCardProps {
  title: string;
  tags: string[];
  description: string;
  totalTime: number;
  courseCount: number;
  completed: number;
}

const LearningTracksCard: React.FC<LearningTracksCardProps> = (props) => {
  const {
    title,
    tags = [],
    description,
    totalTime,
    courseCount,
    completed
  } = props;
  return (
    <div
      className={`h-[17.375rem] w-[26rem] bg-[url('/images/card/LearningTracks/color-bg.svg')] relative flex-shrink-0`}
    >
      <div
        className={`w-full h-full bg-[url('/images/card/LearningTracks/bg.svg')] scale-[1.01] absolute top-0 left-0 hover:-top-1 hover:left-1 hover:transition-all duration-700`}
      >
        <div className="pl-10 pr-4 pt-9">
          <div className="w-[2.875rem] h-1 rounded-xl bg-gradient-to-t from-[#3CBC34] to-[#D9E313]"></div>
          <h2 className="title mt-7">{title}</h2>
          <div className="mt-4">
            {tags.map((tag) => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </div>
          <div className="mt-4 description">{description}</div>

          <div className="flex mt-8  justify-between items-center">
            <div className="flex gap-8">
              <Label
                icon={<ClockIcon color="#f2f2f2" />}
                className="font-neuemachina"
              >
                {computeTime(totalTime, 'Hour')} Hour
              </Label>
              <Label
                icon={<CourseIcon color="#f2f2f2" />}
                className="font-neuemachina"
              >
                {courseCount} Course
              </Label>
            </div>
            <div className="">
              {completed > 0 ? (
                <Button icon={<CompletedIcon />}>
                  {((completed / totalTime) * 100).toFixed(0)}% COMPLETED
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningTracksCard;
