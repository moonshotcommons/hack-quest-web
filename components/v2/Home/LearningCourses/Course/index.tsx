import React, { useEffect, useState } from 'react';
import { CourseTabType } from './type';
import { ProcessType } from '@/service/webApi/course/type';
import Tab from './Tab';
import CourseList from './CourseList';
import NoData from './NoData';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';
import { Spin } from 'antd';
import { LearningTrackType } from '@/service/webApi/learningTrack/type';
import LearningTrackList from './LearningTrackList';

function Course() {
  const [curTab, setCurTab] = useState<ProcessType>(ProcessType.IN_PROCESS);
  const [loading, setLoading] = useState(false);
  const [courseListData, setCourseListData] = useState<
    Record<ProcessType, CourseResponse[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const [learningTrackListData, setLearningTrackListData] = useState<
    Record<ProcessType, LearningTrackType[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const getCourseList = () => {
    return new Promise(async (resolve) => {
      const list = await webApi.courseApi.getCourseListBySearch({
        status: curTab
      });
      const newData = {
        ...courseListData,
        [curTab]: list
      };
      setCourseListData(newData);
      resolve(false);
    });
  };
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
  const changeTab = (tab: CourseTabType) => {
    setCurTab(tab.value);
  };
  useEffect(() => {
    if (
      !courseListData[curTab].length ||
      !learningTrackListData[curTab].length
    ) {
      setLoading(true);
      Promise.all([getCourseList(), getLearningTrackList()]).finally(() => {
        setLoading(false);
      });
    }
  }, [curTab]);
  return (
    <div className="pt-20">
      <Tab curTab={curTab} changeTab={changeTab} />
      <Spin size="large" tip={'加载中...'} spinning={loading}>
        {!courseListData[curTab].length &&
        !learningTrackListData[curTab].length ? (
          <NoData curTab={curTab} />
        ) : (
          <>
            <LearningTrackList
              list={learningTrackListData[curTab]}
              status={curTab}
            />
            <CourseList list={courseListData[curTab]} curTab={curTab} />
          </>
        )}
      </Spin>
    </div>
  );
}

export default Course;
