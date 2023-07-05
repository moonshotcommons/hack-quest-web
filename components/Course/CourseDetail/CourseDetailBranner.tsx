import { tagFormate } from '@/helper/formate';
import { getCourseLink } from '@/helper/utils';
import {
  CourseDetailType,
  CourseResponse,
  CourseUnitType
} from '@/service/webApi/course/type';
import { Typography } from 'antd';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface CourseDetailBannerProps {
  courseDetail?: CourseDetailType;
}

const CourseDetailBanner: FC<CourseDetailBannerProps> = (props) => {
  const { courseDetail } = props;
  const currentLeaningUnit = courseDetail?.units?.find((unit, index) => {
    if (index === 0 && unit.progress === 0) return unit;
    if (unit.progress !== 1) return unit;
  });
  return (
    <div className="h-[30.875rem] flex justify-between">
      <div className="flex flex-col mt-[7.7656rem]">
        <span className="text-[#676767] font-next-book text-base">
          {tagFormate(courseDetail?.type || '')}
        </span>
        <div className="font-next-book-bold text-[5rem] mt-[1.25rem] text-white">
          {courseDetail?.name}
        </div>
        <Typography.Paragraph
          ellipsis={{ rows: 3 }}
          className="w-[29.25rem] text-[#676767] font-next-book mt-[1.125rem] leading-[120%]"
        >
          {courseDetail?.description}
        </Typography.Paragraph>
        <Link
          href={`${getCourseLink(courseDetail?.type, 'unit')}/${
            currentLeaningUnit?.id
          }`}
        >
          <button className="w-fit px-8 py-4 mt-[1.875rem] border border-solid border-[#F2F2F2] rounded-[2.5rem] text-sm text-[#F2F2F2] primary-button-hover">
            Start Learning
          </button>
        </Link>
      </div>
      <div className="w-[18.5rem] h-[18.5rem] mt-[6.25rem] bg-[url('/images/course/syntax_cover.svg')] relative after:absolute after:left-0 after:bottom-0 after:w-[4.1875rem] after:h-[.75rem] after:bg-black after:z-50"></div>
    </div>
  );
};

export default CourseDetailBanner;
