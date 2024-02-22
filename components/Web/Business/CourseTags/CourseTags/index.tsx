import { computeTime, tagFormate } from '@/helper/formate';
import { FC } from 'react';
import CourseLevel from '../CourseLevel';

import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import AltIcon from '@/components/Common/Icon/AltIcon';
import { cn } from '@/helper/utils';
import Tag from '../tag';
import { CourseType } from '@/service/webApi/course/type';

interface CourseTagsProps {
  language?: string;
  level: string;
  duration?: number;
  unitCount: number;
  size?: 'small' | 'large';
  type?: CourseType | 'learning-track';
  className?: string;
}

const CourseTags: FC<CourseTagsProps> = (props) => {
  const {
    language,
    level,
    unitCount,
    duration,
    size = 'small',
    type = CourseType.GUIDED_PROJECT,
    className = ''
  } = props;
  return (
    <div
      className={cn(
        'flex items-center gap-[20px] text-[var(--neutral-rich-gray)]',
        `${size === 'large' ? 'gap-[40px]' : ''} ${className}`
      )}
    >
      <Tag icon={<AltIcon />} size={size}>
        {language}
      </Tag>
      {duration && (
        <Tag icon={<ClockIcon />} size={size}>
          {computeTime(duration, 'Hour')}
        </Tag>
      )}

      {type === 'learning-track' && (
        <Tag icon={<CourseIcon />} size={size}>
          {unitCount + ' ' + `${unitCount > 1 ? 'Courses' : 'Course'}`}
        </Tag>
      )}
      {/* <Tag icon={<CourseIcon />} size={size} className="text-neutral-rich-gray">
        {type === CourseType.GUIDED_PROJECT &&
          unitCount + ' ' + `${unitCount > 1 ? 'Units' : 'Unit'}`}
        {type === CourseType.MINI &&
          unitCount + ' ' + `${unitCount > 1 ? 'Lessons' : 'Lesson'}`}
        {type === 'learning-track' &&
          unitCount + ' ' + `${unitCount > 1 ? 'Courses' : 'Course'}`}
      </Tag> */}
      {type !== 'learning-track' && (
        <CourseLevel level={tagFormate(level)} size={size}></CourseLevel>
      )}
    </div>
  );
};

export default CourseTags;
