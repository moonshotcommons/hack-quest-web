import { QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import { getLessonLink } from '@/helper/utils';
import { CourseType } from '@/service/webApi/course/type';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/** lesson页面跳转到其他lesson时获取跳转参数 */
export const useGetLessonLink = () => {
  const router = useRouter();
  const params = useParams();
  const query = useSearchParams();
  const getLink = useCallback(
    (courseType: CourseType, lessonId: string) => {
      const menu = query.get('menu');
      const learningTrackId = query.get(
        QueryIdType.LEARNING_TRACK_ID
      ) as string;
      const menuCourseId = query.get(QueryIdType.MENU_COURSE_ID) as string;
      const link = getLessonLink(
        courseType,
        params.courseId as string,
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
    [query, params]
  );

  return {
    getLink
  };
};
