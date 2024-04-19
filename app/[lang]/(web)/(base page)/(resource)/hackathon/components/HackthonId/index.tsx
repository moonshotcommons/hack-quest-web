import React, { FC } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import GuestMentors from './GuestMentors';
import MediaCommunity from './components/MediaCommunity';
import HackathonInfo from './HackathonInfo';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import TimeLine from './TimeLine';
import About from './About';

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
              <div className="flex w-[58%] flex-col gap-[60px] [&>div]:w-full">
                <About hackathon={hackathon} />
                <TimeLine hackathon={hackathon} />
                <GuestMentors listData={hackathon.guestsAndMentors} />
                <MediaCommunity listData={hackathon.mediaPartners} title="mediaPartners" />
                <MediaCommunity listData={hackathon.communityPartners} title="communityPartners" />
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
