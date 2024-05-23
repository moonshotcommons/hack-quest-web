'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../../../components/components/Title';

interface VotingRulesProp {
  hackathon: HackathonType;
}

const VotingRules: React.FC<VotingRulesProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('hackathonVoting.votingRules')} />
      <div className="body-m text-neutral-rich-gray">{hackathon.voteRules}</div>
    </div>
  );
};

export default VotingRules;
