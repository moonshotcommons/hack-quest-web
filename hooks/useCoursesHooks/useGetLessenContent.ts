import webApi from '@/service';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { ElectiveLessonType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useRedirect } from '../useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';

export const useGetLessonContent = <
  T extends CourseLessonType | ElectiveLessonType
>(
  lessonId: string,
  courseType: CourseType
) => {
  const [lesson, setLesson] = useState<T>();
  const { redirectToUrl } = useRedirect();
  const setAuthType = useUserStore((state) => state.setAuthType);
  const { run, loading, refresh } = useRequest(
    async (lessonId) => {
      switch (courseType) {
        case CourseType.Mini:
          return webApi.electiveApi.getElectiveLessonContent(lessonId);
        default:
          return webApi.courseApi.getLessonContent(lessonId);
      }
    },
    {
      manual: true,
      onSuccess(res: any) {
        setLesson(res);
      },
      onError(error: any) {
        if (error.code === 401) {
          message.error(error?.msg);
          setAuthType(AuthType.LOGIN);
          redirectToUrl('/');
          return;
        }

        if (error?.code === 403) {
          message.error(error?.msg);
          redirectToUrl('/dashboard');
          return;
        }
        message.error('404 Not Found');
        redirectToUrl('/404');
      }
    }
  );

  useEffect(() => {
    run(lessonId);
  }, [run, lessonId]);

  return {
    lesson,
    loading,
    refresh
  };
};
