import React from 'react';
import PageDescription from '@/components/v2/PageDescription';
import Course from './Course';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import Button from '../../Common/Button';
import InviteCodeCard from '../InviteCodeCard';

function LearningCourses() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  return (
    <div className="pb-10 font-next-book-Thin text-home-default-color container mx-auto">
      <div className="flex justify-between">
        <PageDescription
          title={`Welcome,${userInfo?.name}!`}
          className="pb-20"
          description={
            'This is your Dashboard, where you can check your ongoing and completed courses. '
          }
        />
        <div className="pt-10">
          <InviteCodeCard></InviteCodeCard>
        </div>
      </div>
      <Course />
    </div>
  );
}

export default LearningCourses;
