import Button from '@/components/Common/Button';
import CourseTags from '@/components/Web/Business/CourseTags';
import { tagFormate } from '@/helper/formate';
import { CourseDetailType, CourseType } from '@/service/webApi/course/type';
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
  type: CourseType | 'learning-track';
  rightComponent: ReactNode;
  onStartCallback: VoidFunction;
  startLoading?: boolean;
}

const CourseDetailHeader: FC<CourseDetailHeaderProps> = (props) => {
  const {
    courseDetail,
    itemCount,
    learningStatus = LearningStatus.IN_PROGRESS,
    rightComponent,
    type,
    onStartCallback,
    startLoading = false
  } = props;

  return (
    <div className="flex flex-col">
      <div className="mt-[10px] flex justify-between gap-[50px]">
        <div>
          <h1 className="text-h2 whitespace-nowrap text-neutral-black">
            {(courseDetail as LearningTrackDetailType).name || (courseDetail as CourseDetailType).title}
          </h1>
          <Typography.Paragraph
            // ellipsis={{ rows: 3 }}
            className="body-m mt-[10px] min-h-[78px] w-[775px] max-w-[775px] text-neutral-off-black"
            style={{ marginBottom: 0 }}
          >
            {courseDetail.description}
          </Typography.Paragraph>

          {/* 课程左侧标签 */}
          {learningStatus === LearningStatus.IN_PROGRESS && (
            <div className="mt-[22px]">
              <CourseTags
                language={courseDetail.language}
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
              <CourseProgress progress={Math.floor((courseDetail.progress || 0) * 100)}></CourseProgress>
            </div>
          )}
          {/* 进度条 */}
          {learningStatus === LearningStatus.COMPLETED && (
            <div className="body-xl mt-[58px] text-neutral-black">{`You’ve finished this ${tagFormate(courseDetail.type)}.`}</div>
          )}

          {learningStatus === LearningStatus.UN_START && (
            <div className="mt-5">
              <Button
                loading={startLoading}
                disabled={startLoading}
                className="body-l w-[270px] px-0 py-[16px] text-neutral-black "
                type="primary"
                onClick={onStartCallback}
              >
                {type !== 'learning-track' && 'Start'}
                {type === 'learning-track' && 'Enroll'}
              </Button>
            </div>
          )}
        </div>

        {/* 中间竖线 */}
        {learningStatus === LearningStatus.IN_PROGRESS && (
          <div className="mt-[29px] h-[185px] w-[1px] scale-x-50 bg-neutral-black">&nbsp;</div>
        )}
        <div className="pt-[42px]">{rightComponent} </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;
