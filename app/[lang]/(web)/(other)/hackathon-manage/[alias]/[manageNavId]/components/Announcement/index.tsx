import React from 'react';
import UserSpecific from './UserSpecific';

interface AnnouncementProp {}

const Announcement: React.FC<AnnouncementProp> = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* <EventBase /> */}
      <UserSpecific />
    </div>
  );
};

export default Announcement;
