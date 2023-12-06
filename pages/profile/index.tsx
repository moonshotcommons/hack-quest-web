import MiniElectives from '@/components/v2/Profile/MiniElectives';
import ProfileEdit from '@/components/v2/Profile/ProfileEdit';
import React from 'react';

interface ProfileProp {}

const Profile: React.FC<ProfileProp> = () => {
  return (
    <div className="container mx-auto flex flex-col gap-[60px] py-[40px] font-next-book text-[16px] text-[#0b0b0b]">
      <ProfileEdit />
      <MiniElectives />
    </div>
  );
};

export default Profile;
