import { CourseDetailType } from '@/service/webApi/course/type';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import webApi from '@/service';
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

  const [learningInfo, setLearningInfo] = useState<{
    learningUnitName: string;
    learningLessonName: string;
  }>();
  const jumpLearningLesson = useJumpLeaningLesson();

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

  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('courseDetail-页面留存时间', {
        duration,
        courseName: courseDetail?.name || ''
      });
    };
  }, []);

  useEffect(() => {
    if (courseDetail && learningStatus !== LearningStatus.COMPLETED) {
      webApi.courseApi
        .getLearningLessonId(courseDetail?.id as string)
        .then((res) => {
          const learningUnit = courseDetail.units?.find((unit) => {
            return unit.progress < 1;
          });

          setLearningInfo({
            learningLessonName: res.pageName,
            learningUnitName: learningUnit?.name || ''
          });
        });
    }
  }, [courseDetail]);

  if (!courseDetail) return null;

  const RightComponent = (
    <HeaderRight
      courseDetail={courseDetail}
      itemCount={courseDetail.units?.length || 0}
      nextInfo={{
        title: learningInfo?.learningUnitName || '',
        content: learningInfo?.learningLessonName || ''
      }}
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
        onStartCallback={() => {
          BurialPoint.track('courseDetail-页面上方按钮点击', {
            courseName: courseDetail.name
          });
          resumeCallback();
        }}
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
        <div
          className="mt-[60px] self-center"
          onClick={() => {
            BurialPoint.track('courseDetail-页面下方按钮点击', {
              courseName: courseDetail.name
            });
            resumeCallback();
          }}
        >
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
