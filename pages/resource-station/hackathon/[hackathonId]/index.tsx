import { FC, useEffect, useRef, useState } from 'react';
import About from '@/components/v2/HackDetailBox/About';
import GuestsMentors from '@/components/v2/HackDetailBox/GuestsMentors';
import MediaPartners from '@/components/v2/HackDetailBox/MediaPartners';
import CommunityPartners from '@/components/v2/HackDetailBox/CommunityPartners';
import HackathonInfo from '@/components/v2/HackDetailBox/HackathonInfo';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { QueryIdType } from '@/components/v2/Breadcrumb/type';
import webApi from '@/service';
import Loading from '@/components/v2/Common/Loading';
import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';
import GuestPartner from '@/components/v2/HackDetailBox/components/GuestPartner';

interface HackDetailProps {}

const HackDetail: FC<HackDetailProps> = (props) => {
  const router = useRouter();
  const { data: hackathon = {} as HackathonType } = useRequest(async () => {
    const id = router.query[QueryIdType.HACKATHON_ID];
    const res = await webApi.hackathon.getHackathonDetail(id as string);
    return res;
  });
  return (
    <div className="mx-auto container font-next-book tracking-[0.36px]">
      <Loading loading={!hackathon.id}>
        <div className="w-full min-h-[50vh]">
          {hackathon.id && (
            <>
              <div className="flex justify-between font-next-book">
                <div className="w-[58%]">
                  <About hackathon={hackathon} />
                  <GuestPartner
                    listData={hackathon.guestsAndMentors}
                    title="Guests and Mentors"
                  />
                  <GuestPartner
                    listData={hackathon.mediaPartners}
                    title="Media Partners"
                  />
                  <GuestPartner
                    listData={hackathon.communityPartners}
                    title="Community Partners"
                  />
                </div>
                <div className="w-[39%]">
                  <HackathonInfo hackathon={hackathon} />
                </div>
              </div>
            </>
          )}
        </div>
      </Loading>
    </div>
  );
};

export default HackDetail;
