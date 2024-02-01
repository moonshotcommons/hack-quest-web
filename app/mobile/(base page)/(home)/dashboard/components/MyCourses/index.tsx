'use client';
import Loading from '@/components/Common/Loading';
import webApi from '@/service';
import {
  ProcessType,
  CourseListType,
  ProjectCourseType
} from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import LearningTrackList from './LearningTrackList';
import NoData from './NoData';
import { courseTab } from './data';
import Tab from '@/components/Web/Business/Tab';
import { TabListType } from '@/components/Web/Business/Tab/type';
import Recommend from '../Recommend';
import CourseList from './CourseList';
import { PageResult } from '@/service/webApi/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';

interface MyCoursesProps {
  setApiStatus: (status: string) => void;
  apiStatus: string;
}

export interface MyCoursesRef {
  getMoreCourse: () => void;
}

const MyCourses = forwardRef<MyCoursesRef, MyCoursesProps>((props, ref) => {
  const { setApiStatus } = props;
  const [curTab, setCurTab] = useState<ProcessType>(ProcessType.IN_PROCESS);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [coursePageInfo, setCoursePageInfo] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 9
  });
  const [courseDataAll, setCourseDataAll] = useState<CourseListType[]>([]);
  const [courseListData, setCourseListData] = useState<
    Record<ProcessType, CourseListType[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const [learningTrackListData, setLearningTrackListData] = useState<
    Record<ProcessType, LearningTrackDetailType[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });

  useImperativeHandle(ref, () => {
    return {
      getMoreCourse() {
        setApiStatus('loading');
        setLoading(true);
        const pageInfo = { ...coursePageInfo, page: ++coursePageInfo.page };
        const data = courseDataAll.slice(
          pageInfo.limit * (pageInfo.page - 1),
          pageInfo.limit * pageInfo.page
        );
        setTimeout(() => {
          setLoading(false);
          mergeCourseList({ data, total });
        }, 500);
      }
    };
  });

  const getLearningTrackList = () => {
    return new Promise(async (resolve) => {
      const list = await webApi.learningTrackApi.getLearningTracks({
        status: curTab
      });
      const newData = {
        ...learningTrackListData,
        [curTab]: list
      };
      setLearningTrackListData(newData);
      resolve(true);
    });
  };

  const getCourseList = (pageInfo: {
    page: number;
    limit: number;
  }): Promise<{
    data: CourseListType[];
    total: number;
  }> => {
    setCoursePageInfo({ ...pageInfo });
    setApiStatus('loading');
    return new Promise(async (resolve) => {
      const res = await webApi.courseApi.getCourseListBySearch<
        PageResult<ProjectCourseType | ElectiveCourseType>
      >({
        status: curTab
      });
      setCourseDataAll(res.data);
      const list = res.data.slice(0, pageInfo.page * pageInfo.limit);
      resolve({ data: list, total: res.total });
    });
  };

  const mergeCourseList = (
    course: PageResult<ProjectCourseType | ElectiveCourseType>,
    init?: boolean
  ) => {
    const list = course.data;
    const totalList = course.total ?? total;
    setTotal(totalList);
    const coureList = init ? list : [...courseListData[curTab], ...list];
    const newData = {
      ...courseListData,
      [curTab]: coureList
    };
    if (coureList.length >= totalList) {
      setApiStatus('noMre');
    } else {
      setApiStatus('init');
    }
    setCourseListData(newData);
  };

  const changeTab = (tab: TabListType) => {
    setCurTab(tab.value as ProcessType);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getLearningTrackList(),
      getCourseList({ ...coursePageInfo, page: 1 })
    ])
      .then((res) => {
        mergeCourseList(res[1], true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [curTab]);

  return (
    <div className="flex flex-col">
      <h2 className="text-h2-mob mb-[1.5rem] text-neutral-off-black ">
        My Courses
      </h2>
      <div className="w-fit">
        <Tab
          tabList={courseTab}
          curTab={curTab}
          changeTab={changeTab}
          className="body-l gap-[1.875rem] pb-10 before:bottom-[32px]"
        />
      </div>
      <Loading loading={loading}>
        {!courseListData[curTab].length &&
        !learningTrackListData[curTab].length ? (
          <>
            <NoData curTab={curTab} />
            <Recommend />
          </>
        ) : (
          <div className="flex flex-col gap-y-10">
            <LearningTrackList
              list={learningTrackListData[curTab]}
              curTab={curTab}
            />
            <CourseList list={courseListData[curTab]} curTab={curTab} />
          </div>
        )}
      </Loading>
    </div>
  );
});
MyCourses.displayName = 'MyCourses';

export default MyCourses;
