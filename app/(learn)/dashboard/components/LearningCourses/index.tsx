'use client';
import PageDescription from '@/components/v2/Business/PageDescription';
import { AppRootState } from '@/store/redux';
import { shallowEqual, useSelector } from 'react-redux';
import InviteCodeCard from '@/components/v2/Business/InviteCodeCard';
import MyCourses from './MyCourses';

function LearningCourses() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  return (
    <div className="pb-[70px] font-next-book-Thin text-home-default-color container mx-auto">
      <div className="flex justify-between mt-10">
        <PageDescription
          title={`${
            userInfo?.nickname ? `Welcome, ${userInfo?.nickname}!` : 'Welcome!'
          }`}
          className="pb-20 pt-[30px]"
          description={
            'This is your Dashboard, where you can check your ongoing and completed courses. '
          }
        />
        <InviteCodeCard></InviteCodeCard>
      </div>

      <MyCourses />
    </div>
  );
}

export default LearningCourses;
