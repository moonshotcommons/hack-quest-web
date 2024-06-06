'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../../../../[hackathonId]/components/components/Title';
import HackathonRenderer from '../../../../components/HackathonRenderer';

interface VotingRulesProp {
  hackathon: HackathonType;
}

const VotingRules: React.FC<VotingRulesProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!hackathon.voteRules?.length) return null;
  return (
    <div className="">
      <Title title={t('hackathonVoting.votingRules')} />
      <HackathonRenderer content={hackathon.voteRules} />
    </div>
  );
};

export default VotingRules;
