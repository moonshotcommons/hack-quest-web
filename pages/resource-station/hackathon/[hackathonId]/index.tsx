import { FC, useEffect, useRef, useState } from 'react';
import About from '@/components/v2/HackDetailBox/About';
import HackathonInfo from '@/components/v2/HackDetailBox/HackathonInfo';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { QueryIdType } from '@/components/v2/Breadcrumb/type';
import webApi from '@/service';
import Loading from '@/components/v2/Common/Loading';
import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';
import MediaCommunity from '@/components/v2/HackDetailBox/components/MediaCommunity';
import GuestMentors from '@/components/v2/HackDetailBox/GuestMentors';
import { BurialPoint } from '@/helper/burialPoint';

interface HackDetailProps {}

const HackDetail: FC<HackDetailProps> = (props) => {
  const router = useRouter();
  const { data: hackathon = {} as HackathonType } = useRequest(async () => {
    const id = router.query[QueryIdType.HACKATHON_ID];
    const res = await webApi.hackathon.getHackathonDetail(id as string);
    return res;
  });
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('hackathon-detail-页面留存时间', {
        duration
      });
    };
  }, []);
  return (
    <div className="mx-auto container font-next-book tracking-[0.36px]">
      <Loading loading={!hackathon.id}>
        <div className="w-full min-h-[50vh]">
          {hackathon.id && (
            <>
              <div className="flex justify-between font-next-book">
                <div className="w-[58%]">
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
