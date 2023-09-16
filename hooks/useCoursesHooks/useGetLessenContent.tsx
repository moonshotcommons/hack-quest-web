import webApi from '@/service';
import { CourseLessonType } from '@/service/webApi/course/type';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useGetLessonContent = (lessonId: string) => {
  const [lesson, setLesson] = useState<CourseLessonType>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { run, loading, refresh } = useRequest(
    async (lessonId) => {
      const res = webApi.courseApi.getLessonContent(lessonId);
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
          dispatch(setUnLoginType(UnLoginType.LOGIN));
          router.push('/');
          return;
        }

        if (error?.code === 403) {
          message.error(error?.msg);
          router.push('/home');
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
