import { computeTime, tagFormate } from '@/helper/formate';
import { FC } from 'react';
import CourseLevel from './CourseLevel';

import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import { cn } from '@/helper/utils';
import Tag from './tag';

interface CourseTagsProps {
  level: string;
  duration: number;
  unitCount: number;
  size?: 'small' | 'large';
}

const CourseTags: FC<CourseTagsProps> = (props) => {
  const { level, unitCount, duration, size = 'small' } = props;
  return (
    <div
      className={cn(
        'flex gap-[10px] items-center',
        size === 'large' ? 'gap-[40px]' : ''
      )}
    >
      <CourseLevel level={tagFormate(level)} size={size}></CourseLevel>
      <Tag icon={<ClockIcon />} size={size}>
        {computeTime(duration, 'Hour')}
      </Tag>
      <Tag icon={<CourseIcon />} size={size}>
        {unitCount + ' ' + `${unitCount > 1 ? 'Units' : 'Unit'}`}
      </Tag>
    </div>
  );
};

export default CourseTags;
