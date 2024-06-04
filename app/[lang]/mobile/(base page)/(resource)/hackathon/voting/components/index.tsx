import { Lang, TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import List from './List';
import { useTranslation } from '@/i18n/server';

interface HackathonVotingProp {
  lang: Lang;
  hackathons: HackathonType[];
}

const HackathonVoting: React.FC<HackathonVotingProp> = async ({ lang, hackathons }) => {
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="px-[1.25rem] pb-[3.75rem]">
      <List hackathons={hackathons} lang={lang} />
    </div>
  );
};

export default HackathonVoting;
