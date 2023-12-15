import { computeTime, tagFormate } from '@/helper/formate';
import { FC } from 'react';
import CourseLevel from './CourseLevel';

import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import { cn } from '@/helper/utils';
import Tag from './tag';
import { CourseType } from '@/service/webApi/course/type';

interface CourseTagsProps {
  level: string;
  duration?: number;
  unitCount: number;
  size?: 'small' | 'large';
  type?: CourseType | 'learning-track';
  className?: string;
}

const CourseTags: FC<CourseTagsProps> = (props) => {
  const {
    level,
    unitCount,
    duration,
    size = 'small',
    type = CourseType.GUIDED_PROJECT,
    className
  } = props;
  return (
    <div
      className={cn(
        'flex gap-[10px] items-center',
        `${size === 'large' ? 'gap-[40px]' : ''} ${className}`
      )}
    >
      <CourseLevel
        level={tagFormate(level)}
        size={size}
        className="text-[#3E3E3E] font-next-book"
      ></CourseLevel>
      {duration && (
        <Tag icon={<ClockIcon />} size={size}>
          {computeTime(duration, 'Hour')}
        </Tag>
      )}

      <Tag icon={<CourseIcon />} size={size} className="text-[#3E3E3E]">
        {type === CourseType.GUIDED_PROJECT &&
          unitCount + ' ' + `${unitCount > 1 ? 'Units' : 'Unit'}`}
        {type === CourseType.Mini &&
          unitCount + ' ' + `${unitCount > 1 ? 'Lessons' : 'Lesson'}`}
        {type === 'learning-track' &&
          unitCount + ' ' + `${unitCount > 1 ? 'Courses' : 'Course'}`}
      </Tag>
    </div>
  );
};

export default CourseTags;
