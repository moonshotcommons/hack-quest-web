import webApi from '@/service';
import { RequestError } from '@/service/types';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useGetLessonContent = (lessonId: string) => {
  const [lesson, setLesson] = useState<any>(null);
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

        if (error?.code === 400) {
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
