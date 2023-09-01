import Button from '@/components/v2/Common/Button';

import CourseTags from '@/components/v2/CourseTags';
import { tagFormate } from '@/helper/formate';
import { CourseDetailType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';

import { Typography } from 'antd';
import { FC, ReactNode } from 'react';
import CourseProgress from '../CourseProgress';
import { LearningStatus } from '../type';

interface CourseDetailHeaderProps {
  // children: ReactNode;
  courseDetail: CourseDetailType | LearningTrackDetailType;
  itemCount: number;
  learningStatus?: LearningStatus;
  type: 'course' | 'learning-track';
  rightComponent: ReactNode;
}

const CourseDetailHeader: FC<CourseDetailHeaderProps> = (props) => {
  const {
    courseDetail,
    itemCount,
    learningStatus = LearningStatus.IN_PROGRESS,
    rightComponent,
    type
  } = props;

  return (
    <div className="flex flex-col">
      <div className="flex gap-[50px] mt-[10px] justify-between">
        <div>
          <p className="text-[#0B0B0B] font-next-book text-base leading-[160%] opacity-60">
            {tagFormate(courseDetail.type)}
          </p>
          <h1 className="font-next-poster-Bold text-[40px] text-text-default-color whitespace-nowrap leading-normal">
            {courseDetail.name}
          </h1>
          <Typography.Paragraph
            ellipsis={{ rows: 3 }}
            className="max-w-[775px] w-[775px] min-h-[78px] text-course-detail-desc-text-color font-next-book mt-[10px] leading-[160%] text-base"
            style={{ marginBottom: 0 }}
          >
            {courseDetail.description}
          </Typography.Paragraph>

          {/* 课程左侧标签 */}
          {learningStatus === LearningStatus.IN_PROGRESS && (
            <div className="mt-[22px]">
              <CourseTags
                level={courseDetail.level as string}
                unitCount={itemCount}
                duration={courseDetail.duration}
                size="large"
                type={type}
              ></CourseTags>
            </div>
          )}

          {/* 进度条 */}
          {learningStatus === LearningStatus.IN_PROGRESS && (
            <div className="mt-[31px]">
              <CourseProgress
                progress={(courseDetail.progress || 0) * 100}
              ></CourseProgress>
            </div>
          )}
          {/* 进度条 */}
          {learningStatus === LearningStatus.COMPLETED && (
            <div className="mt-[58px] text-[#0B0B0B] font-next-book text-[21px] tracking-[0.42px] leading-[160%]">
              {`You’ve finished this ${tagFormate(
                courseDetail.type
              )} of study.`}
            </div>
          )}

          {learningStatus === LearningStatus.UN_START && (
            <div className="mt-[32px]">
              <Button
                className="px-0 w-[270px] py-[16px] leading-[125%] text-[#000] font-next-book text-[18px] tracking-[0.36px]"
                type="primary"
              >
                Start
              </Button>
            </div>
          )}
        </div>

        {/* 中间竖线 */}
        {learningStatus === LearningStatus.IN_PROGRESS && (
          <div className="h-[185px] w-[1px] scale-x-50 bg-[#000] mt-[29px]">
            &nbsp;
          </div>
        )}
        <div className="pt-[42px]">{rightComponent} </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;
