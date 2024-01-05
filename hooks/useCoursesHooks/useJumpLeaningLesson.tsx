import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { getLessonLink } from '@/helper/utils';
import webApi from '@/service';
import {
  CourseDetailType,
  ProjectCourseType,
  CourseType
} from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useRedirect } from '../useRedirect';
import { V2_LANDING_PATH } from '@/constants/nav';
import { message } from 'antd';

export interface JumpLeaningLessonType {
  menu: string;
  idTypes: string[];
  ids: string[];
}
export const useJumpLeaningLesson = () => {
  const query = useSearchParams();
  const dispatch = useDispatch();
  const { redirectToUrl } = useRedirect();
  const { run: jumpLearningLesson, loading } = useRequest(
    async (
      courseDetail: CourseDetailType | ProjectCourseType | ElectiveCourseType,
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
          menu: query.get('menu') as string,
          idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
          ids: [
            query.get(QueryIdType.LEARNING_TRACK_ID) || '',
            query.get(QueryIdType.MENU_COURSE_ID) || ''
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
          message.warning('Please login first');
          redirectToUrl(V2_LANDING_PATH);
        }
      }
    }
  );

  return { jumpLearningLesson, loading };
};
