import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { getLessonLink } from '@/helper/utils';
import { CourseType } from '@/service/webApi/course/type';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

/** lesson页面跳转到其他lesson时获取跳转参数 */
export const useGetLessonLink = () => {
  const params = useParams();

  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const menu = query.get('menu');
  const learningTrackId = query.get(QueryIdType.LEARNING_TRACK_ID) as string;
  const menuCourseId = query.get(QueryIdType.MENU_COURSE_ID) as string;
  const getLink = useCallback(
    (courseType: CourseType, lessonId: string, courseName?: string) => {
      // const menu = query.get('menu');
      // const learningTrackId = query.get(
      //   QueryIdType.LEARNING_TRACK_ID
      // ) as string;
      // const menuCourseId = query.get(QueryIdType.MENU_COURSE_ID) as string;
      const link = getLessonLink(courseType, (params.courseId as string) || courseName, lessonId, menuCourseId as string, {
        menu: menu as string,
        idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID, QueryIdType.LESSON_ID],
        ids: [learningTrackId || '', menuCourseId, lessonId]
      });
      return link;
    },
    [menu, learningTrackId, menuCourseId, params]
  );

  return {
    getLink
  };
};
