'use client';
import React, { useRef, useState } from 'react';
import MyCourses from './MyCourses';
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
      className="h-full overflow-auto px-[1.25rem] pb-[30px] pt-[40px]"
      onScroll={handleScroll}
      ref={ProjectsPageRef}
    >
      <MyCourses
        ref={coursesRef}
        setApiStatus={(status) => setApiStatus(status)}
        apiStatus={apiStatus}
      />
      {/* <div className="gap-[48px]">
        
        <div className="w-[286px] flex flex-col gap-[24px]">
          <UserInfo />
          <DaliyQuest />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
