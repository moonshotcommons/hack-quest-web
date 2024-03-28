'use client';
import React, { useRef, useState } from 'react';
import MyCourses from './MyCourses';
import UserInfo from './UserInfo';
import DaliyQuest from './DaliyQuest';
import { MyCoursesRef } from './MyCourses';
import JoinDiscordCard from './JoinDiscordCard';

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
    <div className="h-full overflow-auto pb-[30px] pt-[40px] " onScroll={handleScroll} ref={ProjectsPageRef}>
      <div className="container mx-auto flex max-w-[1280px] gap-[48px]">
        <div className="flex-1">
          <MyCourses ref={coursesRef} setApiStatus={(status) => setApiStatus(status)} apiStatus={apiStatus} />
        </div>
        <div className="flex w-[289px] flex-col gap-[48px]">
          <UserInfo />
          <DaliyQuest />
          <JoinDiscordCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
