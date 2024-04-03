import { CourseDetailType } from '@/service/webApi/course/type';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
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
  const { jumpLearningLesson, loading: jumpLoading } = useJumpLeaningLesson();

  const learningStatus = useMemo(() => {
    if (courseDetail) {
      if ((!!courseDetail.progress && courseDetail.progress <= 0) || !courseDetail.progress)
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
        courseName: courseDetail?.title || ''
      });
    };
  }, []);

  useEffect(() => {
    if (courseDetail && learningStatus !== LearningStatus.COMPLETED) {
      webApi.courseApi.getLearningLessonId(courseDetail?.id as string).then((res) => {
        const learningUnit = courseDetail.units?.find((unit) => {
          return unit.progress < 1;
        });

        setLearningInfo({
          learningLessonName: res.pageName,
          learningUnitName: learningUnit?.title || ''
        });
      });
    }
  }, [courseDetail]);

  if (!courseDetail) return null;

  const RightComponent = (
    <HeaderRight
      detail={courseDetail}
      itemCount={courseDetail.units?.length || 0}
      nextInfo={{
        title: learningInfo?.learningUnitName || '',
        content: learningInfo?.learningLessonName || ''
      }}
      type="course"
      resumeLoading={jumpLoading}
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
        type={courseDetail.type}
        learningStatus={learningStatus}
        startLoading={jumpLoading}
        onStartCallback={() => {
          BurialPoint.track('courseDetail-页面上方按钮点击', {
            courseName: courseDetail.title
          });
          resumeCallback();
        }}
      ></CourseDetailHeader>
      <div className="mt-[60px] w-full">
        <h2 className="text-h3 mb-[30px] text-neutral-black">Syllabus</h2>
        <UnitList courseDetail={courseDetail} learningStatus={learningStatus}></UnitList>
      </div>
      {learningStatus === LearningStatus.UN_START && (
        <div
          className="mt-[60px] self-center"
          onClick={() => {
            BurialPoint.track('courseDetail-页面下方按钮点击', {
              courseName: courseDetail.title
            });
            resumeCallback();
          }}
        >
          <Button className="body-l w-[270px] px-0 py-[16px] text-neutral-black" type="primary">
            Start
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
