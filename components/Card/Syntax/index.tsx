import Button from '@/components/Common/Button';
import ClockIcon from '@/components/Common/Icon/Clock';
import ProgressIcon from '@/components/Common/Icon/Progress';
import CourseIcon from '@/components/Common/Icon/Course';
import Label from '@/components/Common/Label';
import Tag from '@/components/Common/Tag';
import { computeProgress, computeTime, tagFormate } from '@/helper/formate';
import React from 'react';
import { Typography } from 'antd';

export interface SyntaxCardProps {
  name: string;
  tags: string | string[];
  description: string;
  duration: number;
  unitCount: number;
  progress: number;
}

const SyntaxCard: React.FC<SyntaxCardProps> = (props) => {
  const { name, tags = [], description, duration, unitCount, progress } = props;
  return (
    <div
      className={`h-[17.375rem] w-[26rem] bg-[url('/images/card/Syntax/color-bg.svg')] relative flex-shrink-0`}
    >
      <div
        className={`w-full h-full bg-[url('/images/card/Syntax/bg.svg')] scale-[1.01] absolute top-0 left-0 hover:-top-1 hover:left-1 hover:transition-all duration-700`}
      >
        <div className="h-full flex flex-col justify-start pl-10 pr-4 pt-9">
          <div className="w-[2.875rem] h-1 rounded-xl bg-gradient-to-t from-[#0891D5] to-[#38C1A5]"></div>
          <h2 className="title mt-7">{name}</h2>
          <div className="mt-4">
            {(Array.isArray(tags) ? tags : [tags]).map((tag) => {
              return <Tag key={tag}>{tagFormate(tag)}</Tag>;
            })}
          </div>
          <div className="mt-4 flex-1">
            <Typography.Paragraph
              className="description text-xs leading-[128%]"
              ellipsis={{
                rows: 3
              }}
            >
              {description}
            </Typography.Paragraph>
          </div>

          <div className="flex h-[2.25rem] mb-4 justify-between">
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

export default SyntaxCard;
