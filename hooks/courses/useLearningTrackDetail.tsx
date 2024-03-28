import webApi from '@/service';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useGetLearningTrackDetail = (trackId?: string) => {
  const [learningTrackDetail, setLearningTracks] = useState<LearningTrackDetailType & { courses: ProjectCourseType[] }>();

  const router = useRouter();
  const params = useParams();
  const learningTrackId = trackId || params.learningTrackId;
  const { run, loading, refresh } = useRequest(
    async (id) => {
      const res = await webApi.learningTrackApi.getLearningTrackDetailAndCourses(id as string);
      return res;
    },
    {
      cacheKey: 'learning-track-detail',
      manual: true,
      debounceWait: 500,
      onSuccess(res) {
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
