import { CompleteModalInstance } from '@/components/Web/Business/CompleteModal';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { useDebounceFn } from 'ahooks';
import message from 'antd/es/message';
import { useContext, useMemo, useRef, useState } from 'react';
import { useGetLessonLink } from './useGetLessonLink';
import { useRedirect } from '../router/useRedirect';
import { useParams, useSearchParams } from 'next/navigation';
import { useCourseStore } from '@/store/zustand/courseStore';
import { useShallow } from 'zustand/react/shallow';
import { UgcContext } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';

export const useGotoNextLesson = (lesson: CourseLessonType, courseType: CourseType, completed = false) => {
  const { redirectToUrl } = useRedirect();
  const params = useParams();
  const query = useSearchParams();
  const learningTrackId = query.get('learningTrackId');
  // const { courseId: courseName } = params;
  // const [completeModalOpen, setCompleteModalOpen] = useState(false);

  const { getLink } = useGetLessonLink();
  const [loading, setLoading] = useState(false);
  const completeModalRef = useRef<CompleteModalInstance>(null);
  const { setMounted } = useContext(UgcContext);

  const { unitsLessonsList, courseName } = useCourseStore(
    useShallow((state) => ({
      unitsLessonsList: state.unitsLessonsList,
      courseName: state.learnPageTitle
    }))
  );

  const { run: onNextClick } = useDebounceFn(async (callbackProp?) => {
    setLoading(true);
    setMounted(false);
    const { courseId } = params;
    let nextLesson;

    let currentUnitIndex = unitsLessonsList.findIndex((unit) => {
      return unit.id === lesson.unitId;
    });
    const currentUnit = unitsLessonsList[currentUnitIndex];
    const currentLessonIndex = currentUnit?.pages.findIndex((page) => page.id === lesson.id) || 0;
    const isLastUnit = currentUnitIndex === (unitsLessonsList.length || 1) - 1;
    const isLastLesson = currentLessonIndex === (currentUnit?.pages.length || 1) - 1;
    if (callbackProp?.callback && isLastLesson) {
      callbackProp.callback();
      if (callbackProp?.completedCallback) {
        callbackProp?.completedCallback();
      }
      setMounted(true);
      return;
    }

    if (completed) {
      try {
        await webApi.courseApi.completeLesson(lesson.id);
      } catch (e) {
        console.log('完成状态发生错误', e);
      }
    }

    if (isLastUnit && isLastLesson) {
      // redirectToUrl(`${getCourseLink(courseType)}/${lesson.courseId}/completed`);
      BurialPoint.track('lesson-课程完成', {
        courseName: courseId as string
      });
      let nextCourse = null;
      if (learningTrackId) {
        try {
          const learningTrackDetail = await webApi.learningTrackApi.getLearningTrackDetailAndCourses(learningTrackId);
          for (let i = 0; i < learningTrackDetail.sections.length; i++) {
            let section = learningTrackDetail.sections[i];
            const currentLearningIndex = section.courses.findIndex((course) => course.title === courseName);
            if (currentLearningIndex < 0) continue;
            let nextIndex = currentLearningIndex + 1;
            if (nextIndex >= section.courses.length) {
              let nextSectionIndex = i + 1;
              if (nextSectionIndex <= learningTrackDetail.sections.length) {
                nextCourse = learningTrackDetail.sections[nextSectionIndex].courses[0];
              }
            } else {
              nextCourse = section.courses[nextIndex];
            }
          }
        } catch (e) {
          console.log('获取learningTrack信息失败', e);
        }
      }

      completeModalRef.current?.open({
        type: 'course',
        title: courseName as string,
        courseId: courseId as string,
        nextCourse
      });
      if (callbackProp?.completedCallback) {
        callbackProp?.completedCallback();
      }
      setMounted(true);
      return;
    }
    setLoading(false);
    if (currentLessonIndex < (currentUnit?.pages?.length || 1) - 1) {
      nextLesson = currentUnit?.pages[currentLessonIndex + 1];
    } else {
      nextLesson = unitsLessonsList[currentUnitIndex + 1].pages[0];
    }
    const link = getLink(courseType, nextLesson?.id as string);
    redirectToUrl(link);
    if (callbackProp?.completedCallback) {
      callbackProp?.completedCallback();
    }
  });

  return { onNextClick, completeModalRef, loading };
};

export const useBackToPrevLesson = (lesson: CourseLessonType, courseType: CourseType) => {
  const { redirectToUrl } = useRedirect();
  const { getLink } = useGetLessonLink();
  const params = useParams();
  const unitsLessonsList = useCourseStore((state) => state.unitsLessonsList);

  const isFirst = useMemo(() => {
    return lesson.id === unitsLessonsList[0]?.pages[0]?.id;
  }, [lesson, unitsLessonsList]);

  const { run: onBackClick } = useDebounceFn(async () => {
    const { courseId } = params;
    let prevLesson;

    let currentUnitIndex = unitsLessonsList.findIndex((unit) => {
      return unit.id === lesson.unitId;
    });
    const currentUnit = unitsLessonsList[currentUnitIndex];
    const currentLessonIndex = currentUnit?.pages.findIndex((page) => page.id === lesson.id) || 0;
    const isLastUnit = currentUnitIndex === 0;
    const isLastLesson = currentLessonIndex === 0;

    if (isLastUnit && isLastLesson) {
      // redirectToUrl(`${getCourseLink(courseType)}/${lesson.courseId}/completed`);
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
    redirectToUrl(link);
  });

  return { onBackClick, isFirst };
};
