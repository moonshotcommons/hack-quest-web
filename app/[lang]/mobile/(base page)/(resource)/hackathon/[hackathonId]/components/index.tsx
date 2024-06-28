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
import { HackathonPartner } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';

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
          <MediaCommunity
            listData={hackathon.mediaPartners}
            title="mediaPartners"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <MediaCommunity
            listData={hackathon.communityPartners}
            title="communityPartners"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <MediaCommunity
            listData={hackathon.sections.titleSponsor}
            title="titleSponsor"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <MediaCommunity
            listData={hackathon.sections.platinumSponsor}
            title="platinumSponsor"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <MediaCommunity
            listData={hackathon.sections.goldSponsor}
            title="goldSponsor"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <MediaCommunity
            listData={hackathon.sections.silverSponsor}
            title="silverSponsor"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <MediaCommunity
            listData={hackathon.sections.bronzeSponsor}
            title="bronzeSponsor"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <MediaCommunity
            listData={hackathon.sections.venue}
            title="venue"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <MediaCommunity
            listData={hackathon.sections.trackPartner}
            title="trackPartner"
            isHack4Bengal={hackathon.id === HackathonPartner.Hack4Bengal}
          />
          <Resource hackathon={hackathon} />
          <Schedule hackathon={hackathon} />
        </div>
      )}
      <PageRetentionTime trackName="hackathon-detail-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default HackDetail;
