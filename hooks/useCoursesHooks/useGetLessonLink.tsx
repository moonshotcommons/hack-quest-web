import { QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import { getLessonLink } from '@/helper/utils';
import { CourseType } from '@/service/webApi/course/type';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

/** lesson页面跳转到其他lesson时获取跳转参数 */
export const useGetLessonLink = () => {
  const router = useRouter();
  const getLink = useCallback(
    (courseType: CourseType, lessonId: string) => {
      const menu = router.query.menu;
      const learningTrackId = router.query[
        QueryIdType.LEARNING_TRACK_ID
      ] as string;
      const menuCourseId = router.query[QueryIdType.MENU_COURSE_ID] as string;
      const link = getLessonLink(
        courseType,
        router.query.courseId as string,
        lessonId,
        menuCourseId as string,
        {
          menu: menu as string,
          idTypes: [
            QueryIdType.LEARNING_TRACK_ID,
            QueryIdType.MENU_COURSE_ID,
            QueryIdType.LESSON_ID
          ],
          ids: [learningTrackId || '', menuCourseId, lessonId]
        }
      );
      return link;
    },
    [router]
  );

  return {
    getLink
  };
};
