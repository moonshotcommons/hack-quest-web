'use client';
import React, { useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditProvider from './EditProvider';
import EditNav from './EditNav';
import Cover from './Cover';
import Info from './Info';
import TimeLine from './TimeLine';
import Rewards from './Rewards';
import Judging from './Judging';
import Application from './Application';
import Submission from './Submission';
import Links from './Links';
import PartnersBox from './PartnersBox';
import SpeakersSponsorsBox from './SpeakersSponsorsBox';

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
              <Cover hackathon={hackathon} />
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
            </div>
            <div className="relative w-[39%]">
              <Info />
            </div>
          </div>
        </div>
      </div>
    </EditProvider>
  );
};

export default HackathonEdit;
