import { getCourseLink, getLessonLink } from '@/helper/utils';
import webApi from '@/service';
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';

export const useJumpLeaningLesson = () => {
  const router = useRouter();
  const { run } = useRequest(
    async (courseDetail: CourseDetailType) => {
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
        router.push(
          getLessonLink(courseDetail?.type, courseDetail?.name, pageId)
        );
      },
      onError(err: any) {
        if (err.code === 401) {
          router.push('/auth/login');
        }
      }
    }
  );

  return run;
};
