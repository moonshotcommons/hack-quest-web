import { Lang, TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import List from './List';
import { useTranslation } from '@/i18n/server';
import TipsModal from './TipsModal';

interface HackathonVotingProp {
  lang: Lang;
  hackathons: HackathonType[];
}

const HackathonVoting: React.FC<HackathonVotingProp> = async ({ lang, hackathons }) => {
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  return (
    <div>
      <List hackathons={hackathons} lang={lang} />
      <TipsModal />
    </div>
  );
};

export default HackathonVoting;
