import { CourseDetailType } from '@/service/webApi/course/type';
import { FC, useCallback, useMemo } from 'react';

import Button from '@/components/Common/Button';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import CourseDetailHeader from '../CourseDetailHeader';
import HeaderRight from '../HeaderRight';
import UnitList from '../UnitList';
import { LearningStatus } from '../type';

interface CourseDetailProps {
  // children: ReactNode;
  courseDetail?: CourseDetailType;
}

const CourseDetail: FC<CourseDetailProps> = (props) => {
  const { courseDetail } = props;

  const jumpLearningLesson = useJumpLeaningLesson(true);

  const learningStatus = useMemo(() => {
    if (courseDetail) {
      if (courseDetail.progress <= 0 || !courseDetail.progress)
        return LearningStatus.UN_START;
      if (courseDetail.progress >= 1) return LearningStatus.COMPLETED;
    }
    return LearningStatus.IN_PROGRESS;
  }, [courseDetail]);

  const resumeCallback = useCallback(() => {
    courseDetail && jumpLearningLesson(courseDetail);
  }, [courseDetail]);

  if (!courseDetail) return null;

  const RightComponent = (
    <HeaderRight
      courseDetail={courseDetail}
      itemCount={courseDetail.units?.length || 0}
      nextInfo={{ title: 'Unit 3', content: 'Mint - 1' }}
      type="course"
      resumeCallback={resumeCallback}
      learningStatus={learningStatus}
    ></HeaderRight>
  );

  return (
    <div className="flex flex-col pb-[84px]">
      <CourseDetailHeader
        courseDetail={courseDetail}
        itemCount={courseDetail.units?.length || 0}
        rightComponent={RightComponent}
        type="course"
        learningStatus={learningStatus}
        onStartCallback={resumeCallback}
      ></CourseDetailHeader>
      <div className="mt-[60px] w-full">
        <h2 className="mb-[30px] text-[#000] font-next-poster-Bold text-[28px] tracking-[1.68px]">
          Syllabus
        </h2>
        <UnitList
          courseDetail={courseDetail}
          learningStatus={learningStatus}
        ></UnitList>
      </div>
      {learningStatus === LearningStatus.UN_START && (
        <div className="mt-[60px] self-center" onClick={resumeCallback}>
          <Button
            className="px-0 w-[270px] py-[16px] leading-[125%] text-[#000] font-next-book text-[18px] tracking-[0.36px]"
            type="primary"
          >
            Start
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
