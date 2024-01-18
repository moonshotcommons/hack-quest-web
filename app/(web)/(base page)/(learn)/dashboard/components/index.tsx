'use client';
import React, { useRef, useState } from 'react';
import MyCourses from './MyCourses';
import UserInfo from './UserInfo';
import DaliyQuest from './DaliyQuest';
import { MyCoursesRef } from './MyCourses';

interface DashboardProp {}

const Dashboard: React.FC<DashboardProp> = () => {
  const ProjectsPageRef = useRef<HTMLDivElement | null>(null);
  const coursesRef = useRef<MyCoursesRef>(null);
  const [apiStatus, setApiStatus] = useState('init');
  const handleScroll = () => {
    if (apiStatus !== 'init') return;
    const clientHeight = ProjectsPageRef.current?.clientHeight || 0;
    const scrollTop = ProjectsPageRef.current?.scrollTop || 0;
    const scrollHeight = ProjectsPageRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      coursesRef?.current?.getMoreCourse();
    }
  };
  return (
    <div
      className="h-full overflow-auto pt-[40px] pb-[30px] "
      onScroll={handleScroll}
      ref={ProjectsPageRef}
    >
      <div className="flex gap-[48px] container mx-auto">
        <div className="flex-1">
          <MyCourses
            ref={coursesRef}
            setApiStatus={(status) => setApiStatus(status)}
            apiStatus={apiStatus}
          />
        </div>
        <div className="w-[286px] flex flex-col gap-[24px]">
          <UserInfo />
          <DaliyQuest />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
