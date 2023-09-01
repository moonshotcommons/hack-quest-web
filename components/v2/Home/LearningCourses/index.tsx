import React from 'react';
import PageDescription from '@/components/v2/PageDescription';
import Course from './Course';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';

function LearningCourses() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  return (
    <div className="pb-10 font-next-book-Thin text-home-default-color container mx-auto">
      <PageDescription
        title={`Welcome ${userInfo?.name}`}
        description={
          'This is your Dashboard, where you can check your ongoing projects and resume your study.'
        }
      />
      <Course />
    </div>
  );
}

export default LearningCourses;
