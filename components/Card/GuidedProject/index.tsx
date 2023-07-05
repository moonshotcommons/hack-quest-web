import Button from '@/components/Common/Button';
import ClockIcon from '@/components/Common/Icon/Clock';
import ProgressIcon from '@/components/Common/Icon/Progress';
import CourseIcon from '@/components/Common/Icon/Course';
import Label from '@/components/Common/Label';
import Tag from '@/components/Common/Tag';
import { computeProgress, computeTime, tagFormate } from '@/helper/formate';
import React from 'react';

export interface GuidedProjectCardProps {
  name: string;
  tags: string | string[];
  description: string;
  duration: number;
  unitCount: number;
  progress: number;
}

const GuidedProjectCard: React.FC<GuidedProjectCardProps> = (props) => {
  const { name, tags = [], description, duration, unitCount, progress } = props;
  return (
    <div
      className={`h-[17.375rem] w-[26rem] bg-[url('/images/card/GuidedProject/color-bg.svg')] relative flex-shrink-0`}
    >
      <div
        className={`w-full h-full bg-[url('/images/card/GuidedProject/bg.svg')] scale-[1.01] absolute top-0 left-0 hover:-top-1 hover:left-1 hover:transition-all duration-700`}
      >
        <div className="pl-10 pr-4 pt-9">
          <div className="w-[2.875rem] h-1 rounded-xl bg-gradient-to-t from-[#3CBC34] to-[#D9E313]"></div>
          <h2 className="title mt-7">{name}</h2>
          <div className="mt-4">
            {(Array.isArray(tags) ? tags : [tags]).map((tag) => {
              return <Tag key={tag}>{tagFormate(tag)}</Tag>;
            })}
          </div>
          <div className="mt-4 description"></div>

          <div className="flex mt-8  justify-between items-center">
            <div className="flex gap-8">
              <Label
                icon={<ClockIcon color="#f2f2f2" />}
                className="font-neuemachina-light"
              >
                {computeTime(duration, 'Hour')} Hour
              </Label>
              <Label
                icon={<CourseIcon color="#f2f2f2" />}
                className="font-neuemachina-light"
              >
                {unitCount} Course
              </Label>
            </div>
            <div className="">
              {progress > 0 ? (
                <Button icon={<ProgressIcon />}>
                  {computeProgress(progress)}% COMPLETED
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedProjectCard;
