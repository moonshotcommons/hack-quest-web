import React, { FC } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import TimeLine from './TimeLine';
import Rewards from './Rewards';
import Schedule from './Schedule';
import About from './About';
import HackathonImage from './HackathonImage';
import GuestMentors from './GuestMentors';
import MediaCommunity from './components/MediaCommunity';
import HackathonInfo from './HackathonInfo';
import Theme from './Theme';
import Resource from './Resource';

interface HackDetailProps {
  hackathon: HackathonType;
}

const HackDetail: FC<HackDetailProps> = ({ hackathon }) => {
  return (
    <div className="px-[1.25rem] pb-[6.25rem] pt-[1.25rem]">
      {hackathon.id && (
        <div className="flex flex-col gap-[3.75rem]">
          <div>
            <HackathonImage hackathon={hackathon} />
            <div className="pt-[28px]">
              <HackathonInfo hackathon={hackathon} />
            </div>
          </div>
          <About hackathon={hackathon} />
          <Theme hackathon={hackathon} />
          <TimeLine hackathon={hackathon} />
          <Rewards hackathon={hackathon} />
          <GuestMentors listData={hackathon.guestsAndMentors} />
          <MediaCommunity listData={hackathon.mediaPartners} title="mediaPartners" />
          <MediaCommunity listData={hackathon.communityPartners} title="communityPartners" />
          <Resource hackathon={hackathon} />
          <Schedule hackathon={hackathon} />
        </div>
      )}
      <PageRetentionTime trackName="hackathon-detail-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default HackDetail;
