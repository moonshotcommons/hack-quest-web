import React, { FC } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import About from '../HackDetailBox/About';
import GuestMentors from '../HackDetailBox/GuestMentors';
import MediaCommunity from '../HackDetailBox/components/MediaCommunity';
import HackathonInfo from '../HackDetailBox/HackathonInfo';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

interface HackDetailProps {
  hackathon: HackathonType;
}

const HackDetail: FC<HackDetailProps> = ({ hackathon }) => {
  return (
    <div className="container mx-auto pt-[40px]">
      <div className="min-h-[50vh] w-full">
        {hackathon.id && (
          <>
            <div className="flex justify-between">
              <div className="w-[58%]">
                <About hackathon={hackathon} />
                <GuestMentors listData={hackathon.guestsAndMentors} title="Guests and Mentors" />
                <MediaCommunity listData={hackathon.mediaPartners} title="Media Partners" />
                <MediaCommunity listData={hackathon.communityPartners} title="Community Partners" />
              </div>
              <div className="relative w-[39%]">
                <HackathonInfo hackathon={hackathon} />
              </div>
            </div>
          </>
        )}
      </div>
      <PageRetentionTime trackName="hackathon-detail-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default HackDetail;
