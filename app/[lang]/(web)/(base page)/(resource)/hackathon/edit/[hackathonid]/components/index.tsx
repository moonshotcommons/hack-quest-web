'use client';
import React, { useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditProvider from './EditProvider';
import EditNav from './EditNav';
import Info from './Info';
import HandleEditModal from './HandleEditModal';
import AddSection from './AddSection';

interface HackathonEditProp {
  hackathon: HackathonType;
}

const HackathonEdit: React.FC<HackathonEditProp> = ({ hackathon }) => {
  const [curTab, setCurTab] = useState('');
  return (
    <EditProvider>
      <div className="scroll-wrap-y h-full">
        <div className="container relative mx-auto pb-[80px] pt-[40px]">
          <EditNav curTab={curTab} setCurTab={setCurTab} />
          <div className="relative flex justify-between pt-[60px]">
            <div className="flex w-[58%] flex-col gap-[60px] [&>div]:w-full">
              {/* <Cover hackathon={hackathon} />
              <TimeLine hackathon={hackathon} />
              <Rewards hackathon={hackathon} />
              <Judging hackathon={hackathon} />
              <Application hackathon={hackathon} />
              <Submission hackathon={hackathon} />
              <Links hackathon={hackathon} />
              <PartnersBox hackathon={hackathon} type="mediaPartners" />
              <PartnersBox hackathon={hackathon} type="communityPartners" />
              <PartnersBox hackathon={hackathon} type="partners" />
              <SpeakersSponsorsBox hackathon={hackathon} type="speakersAndJudges" />
              <SpeakersSponsorsBox hackathon={hackathon} type="sponsors" />
              <Schedule hackathon={hackathon} />
              <FAQs hackathon={hackathon} /> */}
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
      <HandleEditModal hackathon={hackathon} />
    </EditProvider>
  );
};

export default HackathonEdit;
