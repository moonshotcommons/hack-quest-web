import React, { useEffect, useState } from 'react';
import { CourseTabType } from './type';
import { ProcessType } from '@/service/webApi/course/type';
import Tab from './Tab';
import LearningTrackCard from '@/components/v2/LearningTrackCard';
import CourseList from './CourseList';
import NoData from './NoData';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';

function Course() {
  const [curTab, setCurTab] = useState<ProcessType>(ProcessType.IN_PROCESS);
  const [courseListData, setCourseListData] = useState<
    Record<ProcessType, CourseResponse[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const getCourseList = async (status: ProcessType) => {
    const list = await webApi.courseApi.getCourseListBySearch({ status });
    const newData = {
      ...courseListData,
      [status]: list
    };
    setCourseListData(newData);
  };
  const changeTab = (tab: CourseTabType) => {
    setCurTab(tab.value);
  };
  useEffect(() => {
    if (!courseListData[curTab].length) getCourseList(curTab);
  }, [curTab]);
  return (
    <div className="pt-20">
      <Tab curTab={curTab} changeTab={changeTab} />
      {!courseListData[curTab].length ? (
        <NoData curTab={curTab} />
      ) : (
        <>
          <LearningTrackCard />
          <CourseList list={courseListData[curTab]} />
        </>
      )}
    </div>
  );
}

export default Course;
