import Button from '@/components/Common/Button';
import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import { computeTime, tagFormate } from '@/helper/formate';
import {
  CourseDetailType,
  ProjectCourseType
} from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { FC } from 'react';
import CourseLevel from '@/components/Web/Business/CourseTags/CourseLevel';
import Tag from '@/components/Web/Business/CourseTags/tag';
import { LearningStatus } from '../type';
interface HeaderRightProps {
  // children: ReactNode;
  learningStatus?: LearningStatus;
  nextInfo: { title: string; content: string };
  detail: CourseDetailType | LearningTrackDetailType;
  itemCount: number;
  type: 'course' | 'learning-track';
  resumeCallback: VoidFunction;
  learningCourse?: ProjectCourseType;
  resumeLoading?: boolean;
}

function UnProgressHeaderRight(
  detail: CourseDetailType | LearningTrackDetailType,
  itemCount: number,
  type: 'course' | 'learning-track'
) {
  return (
    <div className="flex w-[445px] max-w-[445px] flex-col border-t border-neutral-black">
      <div className="flex items-center justify-between border-b border-neutral-black px-[15px] py-5">
        <span className="font-next-book-bold text-[18px] tracking-[0.36px] text-neutral-black">
          Experience
        </span>
        <CourseLevel
          level={tagFormate(detail.level as string)}
          size="large"
        ></CourseLevel>
      </div>
      <div className="flex items-center justify-between border-b border-neutral-black px-[15px] py-5">
        <span className="font-next-book-bold text-[18px] tracking-[0.36px] text-neutral-black">
          Duration
        </span>

        <div className="flex w-[151px] items-center pl-[21px]">
          <Tag
            icon={<ClockIcon size={25} />}
            size="large"
            className="body-m gap-[28px] text-neutral-black"
          >
            {computeTime(detail.duration, 'Hour')}
          </Tag>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-neutral-black px-[15px] py-5">
        <span className="font-next-book-bold text-[18px] tracking-[0.36px] text-neutral-black">
          {type === 'course' && 'Total Units'}
          {type === 'learning-track' && 'Total Courses'}
        </span>
        <div className="flex w-[151px] items-center pl-[21px]">
          <Tag
            icon={<CourseIcon size={23} />}
            size="large"
            className="body-m gap-[28px] text-neutral-black"
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
  learningCourse?: ProjectCourseType,
  resumeLoading = false
) {
  return (
    <div className="flex w-[445px] max-w-[445px] flex-col">
      <p className="mb-[12px] font-next-poster-Bold text-[28px] tracking-[1.68px] text-neutral-black">
        Next Up
      </p>
      <p className="body-m text-neutral-black">{nextInfo.title}</p>
      <p className="body-xl text-neutral-black">{nextInfo.content}</p>
      <div className={'mt-[34px] flex items-center gap-[15px]'}>
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
          className="body-l w-[270px] px-0 py-[16px] text-neutral-black"
          type="primary"
          onClick={resumeCallback}
        >
          {type === 'course' &&
            (!!detail.progress && detail.progress <= 0 ? 'Start' : 'Resume')}
          {type === 'learning-track' && learningCourse
            ? !!learningCourse.progress && learningCourse.progress <= 0
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
