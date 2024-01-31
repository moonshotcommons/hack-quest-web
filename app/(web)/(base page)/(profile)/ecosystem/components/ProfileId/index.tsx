'use client';
import React from 'react';
import ProfileEdit from '../ProfileEdit';
import MiniElectives from '../MiniElectives';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

interface ProfileIdProp {}

const ProfileId: React.FC<ProfileIdProp> = () => {
  return (
    <div className="container mx-auto flex flex-col gap-[60px] py-[40px] body-m">
      <ProfileEdit />
      <MiniElectives />
      <PageRetentionTime trackName="ecosystem-profile-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default ProfileId;
