'use client';
import { FC, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import webApi from '@/service';
import Loading from '@/components/Common/Loading';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import About from '../HackDetailBox/About';
import GuestMentors from '../HackDetailBox/GuestMentors';
import MediaCommunity from '../HackDetailBox/components/MediaCommunity';
import HackathonInfo from '../HackDetailBox/HackathonInfo';

interface HackDetailProps {}

const HackDetail: FC<HackDetailProps> = (props) => {
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const { data: hackathon = {} as HackathonType } = useRequest(async () => {
    const id = query.get(QueryIdType.HACKATHON_ID);
    const res = await webApi.resourceStationApi.getHackathonDetail(
      id as string
    );
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
