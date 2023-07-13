import { getCourseLink } from '@/helper/utils';
import webApi from '@/service';
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';

export const useJumpLeaningLesson = (courseDetail: CourseDetailType) => {
  const router = useRouter();
  const { run } = useRequest(
    async () => {
      const lesson = await webApi.courseApi.getLearningLessonId(
        courseDetail?.id as string
      );
      return lesson?.pageId;
    },
    {
      manual: true,
      onSuccess(res) {
        router.push(
          `${getCourseLink(courseDetail?.type)}/${
            courseDetail?.name
          }/learn/${res}`
        );
      },
      onError(err: any) {
        if (err.code === 401) {
          router.push('/login');
        }
      }
    }
  );

  return run;
};
