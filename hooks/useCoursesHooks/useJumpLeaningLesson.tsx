import { QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import { getLessonLink } from '@/helper/utils';
import webApi from '@/service';
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export interface JumpLeaningLessonType {
  menu: string;
  idTypes: string[];
  ids: string[];
}
export const useJumpLeaningLesson = () => {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const { run: jumpLearningLesson, loading } = useRequest(
    async (
      courseDetail: CourseDetailType | CourseResponse,
      lParam?: JumpLeaningLessonType
    ) => {
      const lesson = await webApi.courseApi.getLearningLessonId(
        courseDetail?.id as string
      );
      return {
        courseDetail,
        pageId: lesson?.pageId,
        lParam
      };
    },
    {
      manual: true,
      onSuccess({ courseDetail, pageId, lParam }) {
        const linkParam = lParam || {
          menu: query.menu as string,
          idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
          ids: [
            query[QueryIdType.LEARNING_TRACK_ID] || '',
            query[QueryIdType.MENU_COURSE_ID] || ''
          ] as string[]
        };
        let link = `${getLessonLink(
          courseDetail?.type,
          courseDetail?.name,
          pageId,
          courseDetail?.id,
          linkParam
        )}`;
        router.push(link);
      },
      onError(err: any) {
        if (err.code === 401) {
          dispatch(setUnLoginType(UnLoginType.LOGIN));
          router.push('/');
        }
      }
    }
  );

  return { jumpLearningLesson, loading };
};
