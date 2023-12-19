import { QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import { getLessonLink } from '@/helper/utils';
import webApi from '@/service';
import {
  CourseDetailType,
  CourseResponse,
  CourseType
} from '@/service/webApi/course/type';
import { MiniElectiveCourseType } from '@/service/webApi/elective/type';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useRequest } from 'ahooks';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useRedirect } from '../useRedirect';

export interface JumpLeaningLessonType {
  menu: string;
  idTypes: string[];
  ids: string[];
}
export const useJumpLeaningLesson = () => {
  const query = useParams();
  const dispatch = useDispatch();
  const { redirectToUrl } = useRedirect();
  const { run: jumpLearningLesson, loading } = useRequest(
    async (
      courseDetail: CourseDetailType | CourseResponse | MiniElectiveCourseType,
      lParam?: JumpLeaningLessonType
    ) => {
      let lesson: any;
      switch (courseDetail.type) {
        case CourseType.Mini:
          lesson = await webApi.electiveApi.getElectiveLearningLesson(
            courseDetail.id
          );
          break;
        default:
          lesson = await webApi.courseApi.getLearningLessonId(
            courseDetail?.id as string
          );
      }
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
        redirectToUrl(link);
      },
      onError(err: any) {
        if (err.code === 401) {
          dispatch(setUnLoginType(UnLoginType.LOGIN));
          redirectToUrl('/');
        }
      }
    }
  );

  return { jumpLearningLesson, loading };
};
