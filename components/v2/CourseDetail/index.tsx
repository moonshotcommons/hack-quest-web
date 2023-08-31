import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import { computeTime, tagFormate } from '@/helper/formate';
import { CourseDetailType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { Typography } from 'antd';
import { FC, useMemo } from 'react';
import CourseTags from '../CourseTags';
import CourseLevel from '../CourseTags/CourseLevel';
import Tag from '../CourseTags/tag';
import CourseProgress from './CourseProgress';

enum LearningStatus {
  IN_PROGRESS = 'in_progress',
  UN_START = 'UN_START',
  COMPLETED = 'completed'
}

interface CourseDetailProps {
  // children: ReactNode;
  courseDetail: CourseDetailType | LearningTrackDetailType;
  itemCount: number;
}

const CourseDetail: FC<CourseDetailProps> = (props) => {
  const { courseDetail, itemCount } = props;

  const status = useMemo(() => {
    const progress = courseDetail.progress || 0;
    if (progress <= 0) {
      return LearningStatus.UN_START;
    }
    if (progress >= 1) {
      return LearningStatus.COMPLETED;
    }
    return LearningStatus.IN_PROGRESS;
  }, [courseDetail.progress]);

  const RightComponent = useMemo(() => {
    switch (status) {
      case LearningStatus.IN_PROGRESS:
      // return <></>;
      case LearningStatus.COMPLETED:
      // return <></>;
      case LearningStatus.UN_START:
        return (
          <div className="border-t w-[445px] max-w-[445px] border-[#000] flex flex-col">
            <div className="py-5 px-[15px] border-b border-[#000] flex justify-between items-center">
              <span className="font-next-book-bold tracking-[0.36px] text-black text-[18px]">
                Experience
              </span>
              <CourseLevel
                level={tagFormate(courseDetail.level as string)}
                size="large"
              ></CourseLevel>
            </div>
            <div className="py-5 px-[15px] border-b border-[#000] flex justify-between items-center">
              <span className="font-next-book-bold tracking-[0.36px] text-black text-[18px]">
                Duration
              </span>

              <div className="w-[151px] flex items-center pl-[21px]">
                <Tag
                  icon={<ClockIcon size={25} />}
                  size="large"
                  className="gap-[28px] text-[#0B0B0B] font-next-book text-[16px]"
                >
                  {computeTime(courseDetail.duration, 'Hour')}
                </Tag>
              </div>
            </div>
            <div className="py-5 px-[15px] border-b border-[#000] flex justify-between items-center">
              <span className="font-next-book-bold tracking-[0.36px] text-black text-[18px]">
                Total Sections
              </span>
              <div className="w-[151px] flex items-center pl-[21px]">
                <Tag
                  icon={<CourseIcon size={23} />}
                  size="large"
                  className="gap-[28px] text-[#0B0B0B] font-next-book text-[16px]"
                >
                  {itemCount + ' ' + `${itemCount > 1 ? 'Units' : 'Unit'}`}
                </Tag>
              </div>
            </div>
          </div>
        );
    }
  }, [status]);

  return (
    <div className="flex gap-[50px] mt-[10px]">
      <div>
        <p className="text-course-detail-type-text-color font-next-book text-base">
          {tagFormate(courseDetail.type)}
        </p>
        <h1 className="font-next-book-bold text-[5rem] mt-[1.25rem] leading-[100%] text-text-default-color whitespace-nowrap">
          {courseDetail.name}
        </h1>
        <Typography.Paragraph
          ellipsis={{ rows: 3 }}
          className="w-[29.25rem] text-course-detail-desc-text-color font-next-book mt-[1.125rem] leading-[120%] text-base"
          style={{ marginBottom: 0 }}
        >
          {courseDetail.description}
        </Typography.Paragraph>
        <CourseTags
          level={courseDetail.level as string}
          unitCount={itemCount}
          duration={courseDetail.duration}
          size="large"
        ></CourseTags>
        {status !== LearningStatus.UN_START && (
          <CourseProgress
            progress={(courseDetail.progress || 0) * 100}
          ></CourseProgress>
        )}
      </div>
      <div className="h-[185px] w-[1px] scale-x-50 bg-[#000 ]">&nbsp;</div>
      {RightComponent}
    </div>
  );
};

export default CourseDetail;
