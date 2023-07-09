import { tagFormate } from '@/helper/formate';
import { getCourseLink } from '@/helper/utils';
import {
  CourseDetailType,
  CourseResponse,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface CourseDetailBannerProps {
  courseDetail?: CourseDetailType;
  learningLessonId?: string;
}

const CourseDetailBanner: FC<CourseDetailBannerProps> = (props) => {
  const { courseDetail, learningLessonId } = props;
  const currentLeaningUnit = courseDetail?.units?.find((unit, index) => {
    if (index === 0 && unit.progress === 0) return unit;
    if (unit.progress !== 1) return unit;
  });
  return (
    <div className="flex justify-end relative">
      <div className="absolute top-[7.77rem] left-0 flex flex-col course-detail-banner z-[9999]">
        <span className="text-[#676767] font-next-book text-base">
          {tagFormate(courseDetail?.type || '')}
        </span>
        <div className="font-next-book-bold text-[5rem] mt-[1.25rem] leading-[100%] text-white whitespace-nowrap">
          {courseDetail?.name}
        </div>
        <Typography.Paragraph
          ellipsis={{ rows: 3 }}
          className="w-[29.25rem] text-[#676767] font-next-book mt-[1.125rem] leading-[120%] text-base"
          style={{ marginBottom: 0 }}
        >
          {courseDetail?.description}
        </Typography.Paragraph>
        <Link
          href={`${getCourseLink(courseDetail?.type)}/${
            courseDetail?.name
          }/learn/${learningLessonId}`}
        >
          <button className="w-fit px-8 py-4 mt-[1.875rem] border border-solid border-[#F2F2F2] rounded-[2.5rem] text-sm text-[#F2F2F2] primary-button-hover">
            Start Learning
          </button>
        </Link>
      </div>
      <div className="-mr-[5.5625rem]">
        {/* <Image
          src={`/images/course/course_cover/${courseDetail?.type}.png`}
          alt="cover"

        /> */}
        <Image
          src={`/images/course/course_cover/${courseDetail?.type}.png`}
          alt="cover"
          width={560}
          height={497}
        />
      </div>
    </div>
  );
};

export default CourseDetailBanner;
