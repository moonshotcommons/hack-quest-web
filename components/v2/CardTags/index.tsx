import { computeTime, tagFormate } from '@/helper/formate';
import { CourseResponse } from '@/service/webApi/course/type';
import { FC } from 'react';
import CourseLevel from './CourseLevel';

import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import Tag from './tag';

interface CardTagsProps {
  course: CourseResponse;
}

const CardTags: FC<CardTagsProps> = (props) => {
  const { course } = props;
  return (
    <div className="flex gap-[10px] items-center justify-between">
      <CourseLevel level={tagFormate(course.level as string)}></CourseLevel>
      <Tag icon={<ClockIcon />}>{computeTime(course.duration, 'Hour')}</Tag>
      <Tag icon={<CourseIcon />}>
        {course.unitCount + ' ' + `${course.unitCount > 1 ? 'Units' : 'Unit'}`}
      </Tag>
    </div>
  );
};

export default CardTags;
