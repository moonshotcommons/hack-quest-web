import webApi from '@/service';
import { LearningTrackType } from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useState } from 'react';

export const useGetLearningTracks = (showAll = true) => {
  const [learningTracks, setLearningTracks] = useState<LearningTrackType[]>([]);

  const { loading, refresh } = useRequest(
    async () => {
      let res = await webApi.LearningTrackApi.getLearningTracks();
      if (!showAll) res = res.filter((item) => item.enrolled);
      return res;
    },
    {
      cacheKey: 'learning-tracks',
      onSuccess(res) {
        setLearningTracks(res);
      },
      onError(error: any) {
        message.error(`Learning Tracks ${error.msg}!`);
      }
    }
  );

  return {
    learningTracks,
    loading,
    refresh
  };
};
