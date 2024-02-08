'use client';
import { FC, useContext, useMemo, useState } from 'react';

import { ProjectCourseType } from '@/service/webApi/course/type';
import Button from '@/components/Common/Button';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useRedirect } from '@/hooks/useRedirect';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { SectionContext } from '../../Provider/SectionProvider';
import { LearningTrackDetailContext } from '../../Provider/LearningTrackDetailProvider';
import { BurialPoint } from '@/helper/burialPoint';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';

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

  return (
    <>
      {learningTrackDetail!.enrolled &&
        !!course.progress &&
        course.progress < 1 && (
          <div className="flex items-center justify-end">
            <Button
              loading={loading && clickIndex === courseIndex}
              disabled={loading && clickIndex === courseIndex}
              type="primary"
              className="
              button-text-s py-[9px] uppercase
              transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
              onClick={(e) => {
                e.stopPropagation();
                BurialPoint.track('learningTrackDetail-course学习按钮', {
                  sectionName: section?.name || '',
                  courseName: course.name
                });
                setClickIndex(courseIndex);
                jumpLearningLesson(course, {
                  menu: Menu.LEARNING_TRACK,
                  idTypes: [
                    QueryIdType.LEARNING_TRACK_ID,
                    QueryIdType.MENU_COURSE_ID
                  ],
                  ids: [
                    query.get(QueryIdType.LEARNING_TRACK_ID) as string,
                    course.id
                  ]
                });
              }}
            >
              {course.progress > 0 ? 'Continue' : 'Start'}
            </Button>
          </div>
        )}
    </>
  );
};

export default LearningTrackCourseStatusButton;
