import React, { FC } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import About from '../HackDetailBox/About';
import GuestMentors from '../HackDetailBox/GuestMentors';
import MediaCommunity from '../HackDetailBox/components/MediaCommunity';
import HackathonInfo from '../HackDetailBox/HackathonInfo';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import HackathonImg from '../HackDetailBox/HackathonImg';

interface HackDetailProps {
  hackathon: HackathonType;
}

const HackDetail: FC<HackDetailProps> = ({ hackathon }) => {
  return (
    <div className="flex flex-col gap-[1.5rem] p-[1.25rem] pb-[5rem]">
      {hackathon.id && (
        <>
          <HackathonImg hackathon={hackathon} />
          <HackathonInfo hackathon={hackathon} />
          <About hackathon={hackathon} />
          <GuestMentors
            listData={hackathon.guestsAndMentors}
            title="Guests and Mentors"
          />
          <MediaCommunity
            listData={hackathon.mediaPartners}
            title="Media Partners"
          />
          <MediaCommunity
            listData={hackathon.communityPartners}
            title="Community Partners"
          />
        </>
      )}
      <PageRetentionTime trackName="hackathon-detail-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default HackDetail;
