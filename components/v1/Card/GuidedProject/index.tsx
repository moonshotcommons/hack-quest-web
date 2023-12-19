import Button from '@/components/v2/Common/Button';
import ClockIcon from '@/components/v2/Common/Icon/Clock';
import ProgressIcon from '@/components/v2/Common/Icon/Progress';
import CourseIcon from '@/components/v2/Common/Icon/Course';
import Label from '@/components/v2/Common/Label';
import Tag from '@/components/v2/Common/Tag';
import { computeProgress, computeTime, tagFormate } from '@/helper/formate';
import React from 'react';
import { Typography } from 'antd';

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
        className={`w-full h-full bg-course-guided-card-bg scale-[1.01] absolute top-0 left-0 hover:-top-1 hover:left-1 hover:transition-all duration-700`}
      >
        <div className="h-full pl-10 pr-4 pt-9 flex flex-col justify-start">
          <div className="w-[2.875rem] h-1 rounded-xl bg-gradient-to-t from-[#5C1DE6] to-[#1B7DEC]"></div>
          <h2 className="title text-course-card-title-text-color mt-7">
            {name}
          </h2>
          <div className="mt-4">
            {(Array.isArray(tags) ? tags : [tags]).map((tag) => {
              return (
                <Tag
                  key={tag}
                  className="text-text-default-color border-course-tag-border-color"
                >
                  {tagFormate(tag)}
                </Tag>
              );
            })}
          </div>
          <div className="mt-4 description flex-1 text-xs leading-[128%]">
            <Typography.Paragraph
              className="description text-course-card-description-text-color text-xs leading-[128%]"
              ellipsis={{
                rows: 3
              }}
            >
              {description}
            </Typography.Paragraph>
          </div>

          <div className="flex h-[2.25rem] mb-4 justify-between">
            <div className="flex gap-8">
              <Label icon={<ClockIcon />} className="font-neuemachina-light">
                {computeTime(duration, 'Hour')}
              </Label>
              <Label icon={<CourseIcon />} className="font-neuemachina-light">
                {unitCount + ' ' + `${unitCount > 1 ? 'Units' : 'Unit'}`}
              </Label>
            </div>
            <div className="">
              {progress > 0 ? (
                <Button
                  className="bg-course-progress-button-bg text-course-progress-button-text-bg"
                  size="small"
                  icon={
                    <i className="text-course-progress-icon-bg">
                      <ProgressIcon />
                    </i>
                  }
                >
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
