import webApi from '@/service';
import { useCourseStore } from '@/store/zustand/courseStore';

import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

export const useLoadCourseList = () => {
  const [waitingLoadCourseList, setWaitingLoadCourseList] = useState(true);
  const setCourseList = useCourseStore((state) => state.setCourseList);

  const { run } = useRequest(
    async () => {
      const courseList = await webApi.courseApi.getCourseList();
      return courseList;
    },
    {
      manual: true,
      onSuccess(courseList) {
        setCourseList(courseList.data);
      },
      onError(error: any) {
        console.log(error);
        // message.error(error.msg);
      },
      onFinally() {
        setWaitingLoadCourseList(false);
      }
    }
  );

  useEffect(() => {
    run();
  }, [run]);

  return { waitingLoadCourseList };
};
