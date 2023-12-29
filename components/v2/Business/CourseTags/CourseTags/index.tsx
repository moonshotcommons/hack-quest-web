import { computeTime, tagFormate } from '@/helper/formate';
import { FC } from 'react';
import CourseLevel from '../CourseLevel';

import ClockIcon from '@/components/v2/Common/Icon/Clock';
import CourseIcon from '@/components/v2/Common/Icon/Course';
import AltIcon from '@/components/v2/Common/Icon/AltIcon';
import { cn } from '@/helper/utils';
import Tag from '../tag';
import { CourseType } from '@/service/webApi/course/type';

interface CourseTagsProps {
  alt?: string;
  level: string;
  duration?: number;
  unitCount: number;
  size?: 'small' | 'large';
  type?: CourseType | 'learning-track';
  className?: string;
}

const CourseTags: FC<CourseTagsProps> = (props) => {
  const {
    alt,
    level,
    unitCount,
    duration,
    size = 'small',
    type = CourseType.GUIDED_PROJECT,
    className
  } = props;
  const tagFont =
    type === 'learning-track' ? 'text-[14px] text-[#0b0b0b]' : 'text-[#3E3E3E]';
  return (
    <div
      className={cn(
        'flex gap-[20px] items-center ',
        `${size === 'large' ? 'gap-[40px]' : ''} ${className}`
      )}
    >
      <Tag icon={<AltIcon />} size={size} className="tagFont">
        {alt}
      </Tag>
      {duration && (
        <Tag icon={<ClockIcon />} size={size}>
          {computeTime(duration, 'Hour')}
        </Tag>
      )}

      {type === 'learning-track' && (
        <Tag icon={<CourseIcon />} size={size} className={tagFont}>
          {unitCount + ' ' + `${unitCount > 1 ? 'Courses' : 'Course'}`}
        </Tag>
      )}
      {/* <Tag icon={<CourseIcon />} size={size} className="text-[#3E3E3E]">
        {type === CourseType.GUIDED_PROJECT &&
          unitCount + ' ' + `${unitCount > 1 ? 'Units' : 'Unit'}`}
        {type === CourseType.Mini &&
          unitCount + ' ' + `${unitCount > 1 ? 'Lessons' : 'Lesson'}`}
        {type === 'learning-track' &&
          unitCount + ' ' + `${unitCount > 1 ? 'Courses' : 'Course'}`}
      </Tag> */}
      {type !== 'learning-track' && (
        <CourseLevel
          level={tagFormate(level)}
          size={size}
          className="text-[#3E3E3E]"
        ></CourseLevel>
      )}
    </div>
  );
};

export default CourseTags;
