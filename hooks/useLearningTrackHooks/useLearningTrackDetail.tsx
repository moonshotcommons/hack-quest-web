import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';
import {
  LearningTrackDetailType,
  LearningTrackType
} from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useGetLearningTrackDetail = () => {
  const [learningTrackDetail, setLearningTracks] = useState<
    LearningTrackDetailType & { courses: CourseResponse[] }
  >();

  const router = useRouter();
  const { learningTrackId } = router.query;
  const { run, loading, refresh } = useRequest(
    async (id) => {
      const res =
        await webApi.LearningTrackApi.getLearningTrackDetailAndCourses(
          id as string
        );
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setLearningTracks(res);
        setLearningTracks(res);
      },
      onError(error: any) {
        message.error(`Learning Tracks ${error.msg}!`);
      }
    }
  );

  useEffect(() => {
    run(learningTrackId);
  }, [learningTrackId, run]);

  return {
    learningTrackDetail,
    loading,
    refresh
  };
};
