import React, { FC } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import TimeLine from './TimeLine';
import Rewards from './Rewards';
import Schedule from './Schedule';
import About from './About';
import GuestMentors from './GuestMentors';
import MediaCommunity from './components/MediaCommunity';
import HackathonInfo from './HackathonInfo';

interface HackDetailProps {
  hackathon: HackathonType;
}

const HackDetail: FC<HackDetailProps> = ({ hackathon }) => {
  return (
    <div className="px-[1.25rem] pb-[3.75rem] pt-[1.25rem]">
      {hackathon.id && (
        <div className="flex flex-col gap-[3.75rem]">
          <div>
            <About hackathon={hackathon} />
            <div className="pt-[28px]">
              <HackathonInfo hackathon={hackathon} />
            </div>
          </div>
          <TimeLine hackathon={hackathon} />
          <Rewards hackathon={hackathon} />
          <GuestMentors listData={hackathon.guestsAndMentors} />
          <MediaCommunity listData={hackathon.mediaPartners} title="mediaPartners" />
          <MediaCommunity listData={hackathon.communityPartners} title="communityPartners" />
          <Schedule hackathon={hackathon} />
        </div>
      )}
      <PageRetentionTime trackName="hackathon-detail-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default HackDetail;
