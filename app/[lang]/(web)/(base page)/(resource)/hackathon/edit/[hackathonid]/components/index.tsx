'use client';
import React, { useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditProvider from './EditProvider';
import EditNav from './EditNav';
import Info from './Info';
import HandleEditModal from './HandleEditModal';
import AddSection from './AddSection';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import Loading from '@/components/Common/Loading';
import Cover from './Cover';
import TimeLine from './TimeLine';
import Rewards from './Rewards';
import Judging from './Judging';
import Application from './Application';

interface HackathonEditProp {
  hackathon: HackathonType;
}

const HackathonEdit: React.FC<HackathonEditProp> = ({ hackathon: h }) => {
  console.info(h);
  const [curTab, setCurTab] = useState('');
  const [hackathon, setHackathon] = useState(h);
  const { run: updateHackathon, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonDetail(hackathon.id);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setHackathon(res || {});
      }
    }
  );
  return (
    <EditProvider updateHackathon={updateHackathon}>
      <Loading loading={loading}>
        <div className="scroll-wrap-y h-full">
          <div className="container relative mx-auto pb-[80px] pt-[40px]">
            <EditNav curTab={curTab} setCurTab={setCurTab} />
            <div className="relative flex justify-between pt-[60px]">
              <div className="flex w-[58%] flex-col gap-[60px] [&>div]:w-full">
                <Cover hackathon={hackathon} />
                <TimeLine hackathon={hackathon} />
                <Rewards hackathon={hackathon} />
                <Judging hackathon={hackathon} />
                <Application hackathon={hackathon} />
                {/* <Submission hackathon={hackathon} /> */}
                {/* <Links hackathon={hackathon} /> */}
                {/* <PartnersBox hackathon={hackathon} type="mediaPartners" /> */}
                {/* <PartnersBox hackathon={hackathon} type="communityPartners" /> */}
                {/* <PartnersBox hackathon={hackathon} type="partners" /> */}
                {/* <SpeakersSponsorsBox hackathon={hackathon} type="speakersAndJudges" /> */}
                {/* <SpeakersSponsorsBox hackathon={hackathon} type="sponsors" /> */}
                {/* <Schedule hackathon={hackathon} /> */}
                {/* <FAQs hackathon={hackathon} /> */}
                <AddSection hackathon={hackathon} />
              </div>
              <div className="relative w-[39%]">
                <div className="sticky left-0 top-[70px]">
                  <Info hackathon={hackathon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Loading>
      <HandleEditModal hackathon={hackathon} />
    </EditProvider>
  );
};

export default HackathonEdit;
