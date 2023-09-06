import webApi from '@/service';
import { CourseLessonType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useGetLessonContent = (lessonId: string) => {
  const [lesson, setLesson] = useState<CourseLessonType>();
  const router = useRouter();
  const { run, loading, refresh } = useRequest(
    async (lessonId) => {
      const res = await webApi.courseApi.getLessonContent(lessonId);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setLesson(res);
      },
      onError(error: any) {
        if (error.code === 401) {
          message.error(error?.msg);
          router.push('/auth/login');
          return;
        }

        if (error?.code === 403) {
          message.error(error?.msg);
          router.push('/courses');
          return;
        }
        message.error('404 Not Found');
        router.push('/404');
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
