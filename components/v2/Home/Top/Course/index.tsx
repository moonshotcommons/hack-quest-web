import React, { useState } from 'react';
import { CourseTabType, TabValueType } from './type';
import Tab from './Tab';
import LearningTrackCard from '@/components/v2/LearningTrackCard';
import CourseList from './CourseList';
import NoData from './NoData';

function Course() {
  const [curTab, setCurTab] = useState<TabValueType>(TabValueType.IN_PROGRESS);
  const changeTab = (tab: CourseTabType) => {
    setCurTab(tab.value);
  };
  return (
    <div className="pt-20">
      <Tab curTab={curTab} changeTab={changeTab} />
      <NoData curTab={curTab} />
      <LearningTrackCard />
      <CourseList />
    </div>
  );
}

export default Course;
