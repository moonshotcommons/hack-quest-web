'use client';
import React, { useState } from 'react';
import CoursesTab from '../CoursesTab';
import { CourseTab } from '../../constants/type';
import CourseList from '../CourseList';
import { courseTab } from '../../constants/data';

interface MyCoursesProp {}

const MyCourses: React.FC<MyCoursesProp> = () => {
  const [curTab, setCurTab] = useState<CourseTab>(
    courseTab[0].value as CourseTab
  );
  const list = Array.from({ length: 10 }).map((v, i) => ({ id: i }));
  return (
    <div>
      <div className="text-h3 mb-[24px] text-neutral-off-black">
        <CoursesTab curTab={curTab} changeTab={(val) => setCurTab(val)} />
        <CourseList list={list} />
      </div>
    </div>
  );
};

export default MyCourses;
