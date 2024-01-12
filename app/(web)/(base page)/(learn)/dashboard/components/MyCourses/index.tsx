'use client';
import Loading from '@/components/Common/Loading';
import webApi from '@/service';
import { ProcessType, CourseDetailType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useEffect, useState } from 'react';
import LearningTrackList from './LearningTrackList';
import NoData from './NoData';
import { courseTab } from './data';
import Tab from '@/components/Web/Business/Tab';
import { TabListType } from '@/components/Web/Business/Tab/type';
import Recommend from '../Recommend';
import CourseList from './CourseList';

function MyCourses() {
  const [curTab, setCurTab] = useState<ProcessType>(ProcessType.IN_PROCESS);
  const [loading, setLoading] = useState(false);
  const [courseListData, setCourseListData] = useState<
    Record<ProcessType, CourseDetailType[]>
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

  const getCourseList = () => {
    return new Promise(async (resolve) => {
      const res = await webApi.courseApi.getCourseListBySearch({
        status: curTab
      });
      const newData = {
        ...courseListData,
        [curTab]: res.data
      };
      setCourseListData(newData);
      resolve(false);
    });
  };

  const changeTab = (tab: TabListType) => {
    setCurTab(tab.value as ProcessType);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getLearningTrackList(), getCourseList()]).finally(() => {
      setLoading(false);
    });
  }, [curTab]);
  return (
    <div className="flex flex-col">
      <h2 className="text-h3 text-neutral-off-black mb-[24px] ">My Courses</h2>
      <div className="w-fit">
        <Tab
          tabList={courseTab}
          curTab={curTab}
          changeTab={changeTab}
          className="pb-10 gap-[30px] body-l before:bottom-[32px]"
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
}

export default MyCourses;
