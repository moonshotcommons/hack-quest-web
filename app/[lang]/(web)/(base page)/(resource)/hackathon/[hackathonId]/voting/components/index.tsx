'use client';
import React, { FC, useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import About from './About';
import HackathonInfo from './HackathonInfo';
import VotingRules from './VotingRules';
import VotingProjects from './VotingProjects';
import VoteProvider from './VoteProvider';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import MenuLink from '@/constants/MenuLink';
import PastHackathonCard from '../../../components/HackathonBox/Past/PastHackathonCard';
import BottomSlider from '@/components/Web/Business/BottomSlider';

interface HackathonVotingProps {
  hackathon: HackathonType;
  otherHackathons: HackathonType[];
}

const HackathonVoting: FC<HackathonVotingProps> = ({ hackathon, otherHackathons }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="">
      <div className="container mx-auto mb-[80px] pt-[40px]">
        <div className="min-h-[50vh] w-full">
          {hackathon.id && (
            <VoteProvider>
              <div className="flex justify-between">
                <div className="flex w-[58%] flex-col gap-[60px] [&>div]:w-full">
                  <About hackathon={hackathon} />
                  <VotingRules hackathon={hackathon} />
                  <VotingProjects hackathon={hackathon} />
                </div>
                <div className="relative w-[39%]">
                  <HackathonInfo hackathon={hackathon} />
                </div>
              </div>
            </VoteProvider>
          )}
        </div>
      </div>

      <BottomSlider<HackathonType>
        list={otherHackathons}
        title={t('hackathonVoting.otherHackathons')}
        viewLink={`${MenuLink.HACKATHON}`}
        renderItem={(hackathon) => <PastHackathonCard hackathon={hackathon} isVoting={true} />}
      />
      <PageRetentionTime trackName="hackathon-detail-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default HackathonVoting;
