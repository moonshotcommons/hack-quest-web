import { getLessonLink, getV2LessonLink } from '@/helper/utils';
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
  const dispatch = useDispatch();
  const { run } = useRequest(
    async (
      courseDetail: CourseDetailType | CourseResponse,
      linkParam?: JumpLeaningLessonType
    ) => {
      const lesson = await webApi.courseApi.getLearningLessonId(
        courseDetail?.id as string
      );
      return {
        courseDetail,
        pageId: lesson?.pageId,
        linkParam
      };
    },
    {
      manual: true,
      onSuccess({ courseDetail, pageId, linkParam }) {
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

  return run;
};
