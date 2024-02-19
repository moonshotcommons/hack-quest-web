'use client';
import { FC, useContext, useMemo, useState } from 'react';

import { ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useRedirect } from '@/hooks/useRedirect';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { SectionContext } from '../../Provider/SectionProvider';
import { LearningTrackDetailContext } from '../../Provider/LearningTrackDetailProvider';

interface LearningTrackCourseStatusButtonProps {
  course: ProjectCourseType | ElectiveCourseType;
}

const LearningTrackCourseStatusButton: FC<
  LearningTrackCourseStatusButtonProps
> = ({ course: propCourse }) => {
  const { redirectToUrl } = useRedirect();
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  const { learningTrackDetail } = useContext(LearningTrackDetailContext);

  const { section, sectionIndex } = useContext(SectionContext);
  const enrolled = learningTrackDetail!.enrolled;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const [clickIndex, setClickIndex] = useState<null | number>(null);
  const sectionList = learningTrackDetail!.sections;

  const { course, courseIndex } = useMemo(() => {
    const index = section!.courses.findIndex((c) => c.id === propCourse.id);
    return {
      courseIndex: index,
      course: section!.courses[index]
    };
  }, [section, propCourse]);

  if (!enrolled) return null;

  if (!!course.progress && course.progress <= 0) {
    // 课程为当前section的第一个，判断上个section的最后一个的进度，如果没有完成，那么不显示按钮
    if (courseIndex === 0 && sectionIndex !== 0) {
      let prevCourses = sectionList[sectionIndex - 1].courses;
      let prevCourse = prevCourses[prevCourses.length - 1] as ProjectCourseType;
      if (!!prevCourse.progress && prevCourse.progress < 1) return null;
    }

    //  课程不为当前section的第一个，判断上一个course的progress是否完成，完成展示start，未完成不展示
    if (courseIndex !== 0) {
      let prevCourse = sectionList[sectionIndex].courses[courseIndex - 1];
      if (!!prevCourse.progress && prevCourse.progress < 1) return null;
    }
  }

  if (!learningTrackDetail!.enrolled || !course.progress) return null;

  if (course.progress < 1) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-[6.25rem]"></div>
        {/* 进度条 */}
        <div className="flex w-full items-center gap-2">
          <div className="relative h-[7px] flex-1 rounded-[3px] bg-neutral-off-white">
            <div
              className="absolute left-0 top-0 h-full rounded-[3px] bg-yellow-primary opacity-60"
              style={{
                width: `${course.progress * 100}%`
              }}
            ></div>
          </div>
          <span className="caption-10pt text-neutral-rich-gray">
            {Math.floor(course.progress * 100)}%
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default LearningTrackCourseStatusButton;
