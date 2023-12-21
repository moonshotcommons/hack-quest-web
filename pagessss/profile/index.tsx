import MiniElectives from '@/components/v2/Profile/MiniElectives';
import ProfileEdit from '@/components/v2/Profile/ProfileEdit';
import { BurialPoint } from '@/helper/burialPoint';
import React, { useEffect } from 'react';

interface ProfileProp {}

const Profile: React.FC<ProfileProp> = () => {
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('profile-页面留存时间', {
        duration
      });
    };
  }, []);
  return (
    <div className="container mx-auto flex flex-col gap-[60px] py-[40px] font-next-book text-[16px] text-[#0b0b0b]">
      <ProfileEdit />
      <MiniElectives />
    </div>
  );
};

export default Profile;
