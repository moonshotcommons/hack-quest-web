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
import HackathonImage from './HackathonImage';
import Theme from './Theme';
import Resource from './Resource';
import JudgingCriteria from './JudgingCriteria';
import { HackathonPartner } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';

interface HackDetailProps {
  hackathon: HackathonType;
}

const HackDetail: FC<HackDetailProps> = ({ hackathon }) => {
  return (
    <div className="container mx-auto pb-[120px] pt-[40px]">
      <div className="min-h-[50vh] w-full">
        {hackathon.id && (
          <>
            <div className="flex justify-between">
              <div className="flex w-[58%] flex-col gap-[60px] [&>div]:w-full">
                <HackathonImage hackathon={hackathon} />
                <About hackathon={hackathon} />
                <Theme hackathon={hackathon} />
                <JudgingCriteria hackathon={hackathon} />
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
