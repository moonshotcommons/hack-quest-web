'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../../../components/components/Title';
import Filter, { SearchType } from './Filter';
import VoteCards from './VoteCards';
import { HackathonVoteContext } from '../../../../constants/type';

interface VotingProjectsProp {
  hackathon: HackathonType;
}

const VotingProjects: React.FC<VotingProjectsProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setView } = useContext(HackathonVoteContext);
  const handleSearch = (search: SearchType) => {
    setView(search.view);
  };
  const projects = Array.from({ length: 10 }).map((_, i) => ({ id: i }));
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('hackathonVoting.votingProjects')} />
      <Filter hackathon={hackathon} handleSearch={handleSearch} />
      <VoteCards projects={projects} />
    </div>
  );
};

export default VotingProjects;
