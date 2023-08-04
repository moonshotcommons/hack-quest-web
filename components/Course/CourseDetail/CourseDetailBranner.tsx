import Button from '@/components/Common/Button';
import { tagFormate } from '@/helper/formate';
import { getCourseLink } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import webApi from '@/service';
import {
  CourseDetailType,
  CourseResponse,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode, useMemo } from 'react';
import styled from 'styled-components';

interface CourseDetailBannerProps {
  courseDetail?: CourseDetailType;
  jumpRef?: any;
  children?: ReactNode;
}

const CourseDetailBanner: FC<CourseDetailBannerProps> = (props) => {
  const { courseDetail, jumpRef, children } = props;
  const router = useRouter();
  const jumpLearningLesson = useJumpLeaningLesson();

  return (
    <div className="flex justify-end relative">
      <div className="absolute top-[7.77rem] left-0 flex flex-col course-detail-banner z-[50]">
        <span className="text-course-detail-type-text-color font-next-book text-base">
          {tagFormate(courseDetail?.type || '')}
        </span>
        <div className="font-next-book-bold text-[5rem] mt-[1.25rem] leading-[100%] text-text-default-color whitespace-nowrap">
          {courseDetail?.name}
        </div>
        <Typography.Paragraph
          ellipsis={{ rows: 3 }}
          className="w-[29.25rem] text-course-detail-desc-text-color font-next-book mt-[1.125rem] leading-[120%] text-base"
          style={{ marginBottom: 0 }}
        >
          {courseDetail?.description}
        </Typography.Paragraph>
        {children ||
          (courseDetail && (
            <Button
              size="medium-x"
              className="mt-[1.875rem]
              bg-course-learning-button-bg
              border
              border-solid
              border-course-learning-button-border-color
              rounded-[2.5rem]
              text-sm
              text-course-learning-button-text-color"
              onClick={() => {
                if (courseDetail) {
                  jumpLearningLesson(courseDetail);
                }
              }}
            >
              {courseDetail?.progress || 0 > 0
                ? 'Resume Learning'
                : 'Start Learning'}
            </Button>
          ))}
      </div>
      <div className="-mr-[5.5625rem]">
        {/* <Image
          src={`/images/course/course_cover/${courseDetail?.type}.png`}
          alt="cover"

        /> */}
        {courseDetail?.type && (
          <Image
            src={`/images/course/course_cover/${courseDetail?.type}.png`}
            alt="cover"
            width={560}
            height={497}
          />
        )}
      </div>
    </div>
  );
};

export default CourseDetailBanner;
