import Button from '@/components/v2/Common/Button';
import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import { computeTime, tagFormate } from '@/helper/formate';
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { FC } from 'react';
import CourseLevel from '../../CourseTags/CourseLevel';
import Tag from '../../CourseTags/tag';
import { LearningStatus } from '../type';
interface HeaderRightProps {
  // children: ReactNode;
  learningStatus?: LearningStatus;
  nextInfo: { title: string; content: string };
  detail: CourseDetailType | LearningTrackDetailType;
  itemCount: number;
  type: 'course' | 'learning-track';
  resumeCallback: VoidFunction;
  learningCourse?: CourseResponse;
  resumeLoading?: boolean;
}

function UnProgressHeaderRight(
  detail: CourseDetailType | LearningTrackDetailType,
  itemCount: number,
  type: 'course' | 'learning-track'
) {
  return (
    <div className="border-t w-[445px] max-w-[445px] border-[#000] flex flex-col">
      <div className="py-5 px-[15px] border-b border-[#000] flex justify-between items-center">
        <span className="font-next-book-bold tracking-[0.36px] text-black text-[18px]">
          Experience
        </span>
        <CourseLevel
          level={tagFormate(detail.level as string)}
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
            {computeTime(detail.duration, 'Hour')}
          </Tag>
        </div>
      </div>
      <div className="py-5 px-[15px] border-b border-[#000] flex justify-between items-center">
        <span className="font-next-book-bold tracking-[0.36px] text-black text-[18px]">
          {type === 'course' && 'Total Units'}
          {type === 'learning-track' && 'Total Courses'}
        </span>
        <div className="w-[151px] flex items-center pl-[21px]">
          <Tag
            icon={<CourseIcon size={23} />}
            size="large"
            className="gap-[28px] text-[#0B0B0B] font-next-book text-[16px]"
          >
            {type === 'course' &&
              itemCount + ' ' + `${itemCount > 1 ? 'Units' : 'Unit'}`}
            {type === 'learning-track' &&
              itemCount + ' ' + `${itemCount > 1 ? 'Courses' : 'Course'}`}
          </Tag>
        </div>
      </div>
    </div>
  );
}

function InProgressHeaderRight(
  nextInfo: { title: string; content: string },
  detail: CourseDetailType | LearningTrackDetailType,
  itemCount: number,
  type: 'course' | 'learning-track',
  resumeCallback: VoidFunction,
  learningCourse?: CourseResponse,
  resumeLoading = false
) {
  return (
    <div className="flex flex-col w-[445px] max-w-[445px]">
      <p className="text-[#000] text-[28px] font-next-poster-Bold tracking-[1.68px] mb-[12px]">
        Next Up
      </p>
      <p className="font-next-book-Thin text-[#000] leading-[160%] text-[16px] tracking-[0.32px]">
        {nextInfo.title}
      </p>
      <p className="font-next-book text-[24px] leading-[160%] tracking-[0.48px] text-[#000]">
        {nextInfo.content}
      </p>
      <div className={'flex gap-[15px] items-center mt-[34px]'}>
        {/* <CourseLevel
          level={tagFormate(courseDetail.level as string)}
        ></CourseLevel>
        <Tag icon={<ClockIcon />}>
          {computeTime(courseDetail.duration, 'Hour')}
        </Tag>
        <Tag icon={<CourseIcon />}>
          {type === 'course' &&
            itemCount + ' ' + `${itemCount > 1 ? 'Units' : 'Unit'}`}
          {type === 'learning-track' &&
            itemCount + ' ' + `${itemCount > 1 ? 'Courses' : 'Course'}`}
        </Tag> */}
      </div>
      <div className="mt-[40px]">
        <Button
          loading={resumeLoading}
          disabled={resumeLoading}
          className="px-0 w-[270px] py-[16px] leading-[125%] text-[#000] font-next-book text-[18px] tracking-[0.36px]"
          type="primary"
          onClick={resumeCallback}
        >
          {type === 'course' && (detail.progress <= 0 ? 'Start' : 'Resume')}
          {type === 'learning-track' && learningCourse
            ? learningCourse.progress <= 0
              ? 'Start'
              : 'Resume'
            : ''}
        </Button>
      </div>
    </div>
  );
}

const HeaderRight: FC<HeaderRightProps> = (props) => {
  const {
    detail,
    itemCount,
    learningStatus = LearningStatus.IN_PROGRESS,
    type,
    resumeCallback,
    learningCourse,
    resumeLoading = false
  } = props;

  if (
    type === 'learning-track' &&
    !(detail as LearningTrackDetailType).enrolled
  ) {
  }

  switch (learningStatus) {
    case LearningStatus.IN_PROGRESS:
      let nextInfo = props.nextInfo || { title: '', content: '' };
      return InProgressHeaderRight(
        nextInfo,
        detail,
        itemCount,
        type,
        resumeCallback,
        learningCourse,
        resumeLoading
      );
    case LearningStatus.COMPLETED:
    case LearningStatus.UN_START:
      return UnProgressHeaderRight(detail, itemCount, type);
  }
};

export default HeaderRight;
