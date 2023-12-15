import { errorMessage } from '@/helper/utils';
import webApi from '@/service';
import { MiniElectiveCourseType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

export const useGetElectives = (electiveId: string) => {
  const [course, setCourse] = useState<MiniElectiveCourseType | null>(null);

  const {
    run: getCourseDetail,
    loading,
    refresh
  } = useRequest(
    async () => {
      const res = await webApi.electiveApi.getElectiveDetailAndPages(
        electiveId,
        true
      );
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setCourse(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    if (electiveId) {
      getCourseDetail();
    }
  }, [electiveId, getCourseDetail]);

  return {
    course,
    loading,
    refresh
  };
};
