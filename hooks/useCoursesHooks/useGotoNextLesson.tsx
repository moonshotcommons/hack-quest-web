import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { AppRootState } from '@/store/redux';
import { useDebounceFn } from 'ahooks';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useGetLessonLink } from './useGetLessonLink';

export const useGotoNextLesson = (
  lesson: CourseLessonType,
  courseType: CourseType,
  completed = false,
  isV2 = false
) => {
  const router = useRouter();
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const { getLink } = useGetLessonLink();
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
      // router.push(`${getCourseLink(courseType)}/${lesson.courseId}/completed`);
      BurialPoint.track('lesson-课程完成', {
        courseId: courseId as string
      });
      setCompleteModalOpen(true);
      return;
    }

    if (currentLessonIndex < (currentUnit?.pages?.length || 1) - 1) {
      nextLesson = currentUnit?.pages[currentLessonIndex + 1];
    } else {
      nextLesson = unitsLessonsList[currentUnitIndex + 1].pages[0];
    }
    const link = getLink(courseType, nextLesson?.id as string);
    router.push(link);
  });

  return { onNextClick, completeModalOpen, setCompleteModalOpen };
};

export const useBackToPrevLesson = (
  lesson: CourseLessonType,
  courseType: CourseType,
  isV2 = false
) => {
  const router = useRouter();
  const { getLink } = useGetLessonLink();
  const { unitsLessonsList } = useSelector((state: AppRootState) => {
    return {
      unitsLessonsList: state.course.unitsLessonsList
    };
  }, shallowEqual);

  const isFirst = useMemo(() => {
    return lesson.id === unitsLessonsList[0]?.pages[0]?.id;
  }, [lesson, unitsLessonsList]);

  const { run: onBackClick } = useDebounceFn(async () => {
    const { courseId } = router.query;
    let prevLesson;

    let currentUnitIndex = unitsLessonsList.findIndex((unit) => {
      return unit.id === lesson.unitId;
    });
    const currentUnit = unitsLessonsList[currentUnitIndex];
    const currentLessonIndex =
      currentUnit?.pages.findIndex((page) => page.id === lesson.id) || 0;
    const isLastUnit = currentUnitIndex === 0;
    const isLastLesson = currentLessonIndex === 0;

    if (isLastUnit && isLastLesson) {
      // router.push(`${getCourseLink(courseType)}/${lesson.courseId}/completed`);
      message.warning(`There's no more to it!`);
      return;
    }

    if (currentLessonIndex > 0) {
      prevLesson = currentUnit?.pages[currentLessonIndex - 1];
    } else {
      const prevUnit = unitsLessonsList[currentUnitIndex - 1];
      prevLesson = prevUnit.pages.at(-1);
    }

    const link = getLink(courseType, prevLesson?.id as string);
    router.push(link);
  });

  return { onBackClick, isFirst };
};
