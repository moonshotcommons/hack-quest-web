import React from 'react';
import MyCourses from '../MyCourses';
import UserInfo from '../UserInfo';
import Messages from '../Messages';
import { CourseTab } from '../../constants/type';

interface ContentProp {
  status: CourseTab;
}

const Content: React.FC<ContentProp> = ({ status }) => {
  return (
    <div className="container mx-auto flex gap-[48px] py-[48px]">
      <div className="flex-1">
        <MyCourses status={status} />
      </div>
      <div className="flex w-[289px] flex-col gap-[48px]">
        <UserInfo />
        <Messages />
      </div>
    </div>
  );
};

export default Content;
