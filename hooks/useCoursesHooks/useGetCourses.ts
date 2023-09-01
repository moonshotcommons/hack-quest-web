import webApi from '@/service';
import { AppRootState } from '@/store/redux';
import { setCourseList } from '@/store/redux/modules/course';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export const useLoadCourseList = () => {
  const dispatch = useDispatch();
  const [waitingLoadCourseList, setWaitingLoadCourseList] = useState(true);

  const { run } = useRequest(
    async () => {
      const courseList = await webApi.courseApi.getCourseList();
      return courseList;
    },
    {
      manual: true,
      onSuccess(courseList) {
        dispatch(setCourseList(courseList));
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

export const useGetCourses = () => {
  const { courseList } = useSelector((rootState: AppRootState) => {
    return {
      courseList: rootState.course.courseList
    };
  }, shallowEqual);

  return courseList;
};
