import { getLessonLink, getV2LessonLink } from '@/helper/utils';
import webApi from '@/service';
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export const useJumpLeaningLesson = (isV2: boolean = false) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { run } = useRequest(
    async (courseDetail: CourseDetailType | CourseResponse) => {
      const lesson = await webApi.courseApi.getLearningLessonId(
        courseDetail?.id as string
      );
      return {
        courseDetail,
        pageId: lesson?.pageId
      };
    },
    {
      manual: true,
      onSuccess({ courseDetail, pageId }) {
        // router.push(
        //   `${getCourseLink(courseDetail?.type)}/${
        //     courseDetail?.name
        //   }/learn/${pageId}`
        // );
        if (isV2) {
          router.push(
            getV2LessonLink(courseDetail?.type, courseDetail?.name, pageId)
          );
          return;
        }
        router.push(
          getLessonLink(courseDetail?.type, courseDetail?.name, pageId)
        );
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
