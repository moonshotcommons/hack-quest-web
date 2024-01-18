import PageDescription from '@/components/Web/Business/PageDescription';

import InviteCodeCard from '@/components/Web/Business/InviteCodeCard';
import MyCourses from './MyCourses';
import { useUserStore } from '@/store/zustand/userStore';

function LearningCourses() {
  const userInfo = useUserStore((state) => state.userInfo);
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
