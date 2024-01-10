import React from 'react';
import MyCourses from './MyCourses';
import UserInfo from './UserInfo';
import DaliyQuest from './DaliyQuest';

interface DashboardProp {}

const Dashboard: React.FC<DashboardProp> = () => {
  return (
    <div className="flex  gap-[48px]">
      <div className="flex-1">
        <MyCourses />
      </div>
      <div className="w-[286px] flex flex-col gap-[24px]">
        <UserInfo />
        <DaliyQuest />
      </div>
    </div>
  );
};

export default Dashboard;
