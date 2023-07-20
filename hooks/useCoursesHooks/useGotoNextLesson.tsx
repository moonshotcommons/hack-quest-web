import { getCourseLink } from '@/helper/utils';
import webApi from '@/service';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { AppRootState } from '@/store/redux';
import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector } from 'react-redux';

export const useGotoNextLesson = (
  lesson: CourseLessonType,
  courseType: CourseType,
  completed = false
) => {
  const router = useRouter();
  const { unitsLessonsList } = useSelector((state: AppRootState) => {
    return {
      unitsLessonsList: state.course.unitsLessonsList
    };
  }, shallowEqual);
  const { run: onNextClick } = useDebounceFn(async () => {
    const { courseId } = router.query;
    let nextLesson;
    if (completed) {
      try {
        await webApi.courseApi.completeLesson(lesson.id);
      } catch (e) {
        console.log('完成状态发生错误', e);
      }
    }
    let currentUnitIndex = unitsLessonsList.findIndex((unit) => {
      return unit.id === lesson.unitId;
    });
    const currentUnit = unitsLessonsList[currentUnitIndex];
    const currentLessonIndex =
      currentUnit?.pages.findIndex((page) => page.id === lesson.id) || 0;
    const isLastUnit = currentUnitIndex === (unitsLessonsList.length || 1) - 1;
    const isLastLesson =
      currentLessonIndex === (currentUnit?.pages.length || 1) - 1;

    if (isLastUnit && isLastLesson) {
      router.push(`${getCourseLink(courseType)}/${lesson.courseId}/completed`);
      return;
    }

    if (currentLessonIndex < (currentUnit?.pages?.length || 1) - 1) {
      nextLesson = currentUnit?.pages[currentLessonIndex + 1];
    } else {
      nextLesson = unitsLessonsList[currentUnitIndex + 1].pages[0];
    }
    router.push(
      `${getCourseLink(courseType)}/${courseId}/learn/${nextLesson?.id}`
    );
  });

  return { onNextClick };
};
