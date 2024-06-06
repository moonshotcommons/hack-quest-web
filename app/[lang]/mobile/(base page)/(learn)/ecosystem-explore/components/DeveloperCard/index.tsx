import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import React from 'react';
import AltIcon from '@/components/Common/Icon/AltIcon';
import { Tag } from '@/components/Web/Business/CourseTags';
import CourseCover from '@/public/images/learn/couse_cover.png';
import { CourseDetailType, CourseType } from '@/service/webApi/course/type';
import Link from 'next/link';
import { getCoursePrefixByCourseType } from '@/helper/utils';

interface DeveloperCardProp {
  course: CourseDetailType;
}

const DeveloperCard: React.FC<DeveloperCardProp> = ({ course }) => {
  return (
    <Link
      href={`${getCoursePrefixByCourseType(course.type || CourseType.LEARNING_TRACK)}/${course.id}`}
      className="card-hover block w-full overflow-hidden rounded-[1rem] bg-neutral-white"
    >
      <div className="relative h-0 w-full flex-shrink-0 overflow-hidden pt-[46%]">
        <Image src={course.image || CourseCover} fill alt={course.title} className="object-cover" />
      </div>
      <div className="flex flex-col gap-[.75rem] p-[1.5rem]">
        <div className="flex gap-[.75rem]">
          <TrackTag track={course.track} />
        </div>
        <h2 className="body-l-bold line-clamp-2 text-neutral-off-black">{course.title}</h2>
        <p className="body-s line-clamp-2 text-neutral-medium-gray">{course.description}</p>
        <div className="flex gap-[1.25rem]">
          <Tag icon={<AltIcon />} className="text-neutral-rich-gray" size={'small'}>
            {course.language}
          </Tag>
        </div>
      </div>
    </Link>
  );
};

export default DeveloperCard;
