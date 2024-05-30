import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import React from 'react';
import AltIcon from '@/components/Common/Icon/AltIcon';
import { Tag } from '@/components/Web/Business/CourseTags';
import CourseCover from '@/public/images/learn/couse_cover.png';
import { CourseDetailType } from '@/service/webApi/course/type';
import Link from 'next/link';
import { getCoursePrefixByCourseType } from '@/helper/utils';

interface DeveloperCardProp {
  course: CourseDetailType;
}

const DeveloperCard: React.FC<DeveloperCardProp> = ({ course }) => {
  return (
    <Link
      href={`${getCoursePrefixByCourseType(course.type)}/${course.id}`}
      className="card-hover flex h-[270px] w-full overflow-hidden rounded-[16px] bg-neutral-white"
    >
      <div className="relative h-full w-[480px] flex-shrink-0 overflow-hidden">
        <Image src={course.image || CourseCover} fill alt={course.title} className="object-contain" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-[24px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[12px]">
            <TrackTag track={course.track} />
          </div>
          <h2 className="body-l-bold line-clamp-2 text-neutral-off-black">{course.title}</h2>
          <p className="body-s line-clamp-3 text-neutral-medium-gray">{course.description}</p>
        </div>
        <div className="flex gap-[20px]">
          <Tag icon={<AltIcon />} className="text-neutral-rich-gray" size={'small'}>
            {course.language}
          </Tag>
        </div>
      </div>
    </Link>
  );
};

export default DeveloperCard;
