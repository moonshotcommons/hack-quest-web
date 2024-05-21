'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useEffect, useState } from 'react';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import Title from '../../../components/components/Title';
import Filter, { SearchType } from './Filter';
import VoteCards from './VoteCards';
import { HackathonVoteContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import webApi from '@/service';
import { cloneDeep } from 'lodash-es';

interface VotingProjectsProp {
  hackathon: HackathonType;
}

const VotingProjects: React.FC<VotingProjectsProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setInitProjects, setRemainingVotes, voteData, setVoteData } = useContext(HackathonVoteContext);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isInit, setIsInit] = useState(true);
  const handleSearch = (search: SearchType) => {
    getProjects(search);
    setVoteData([]);
  };
  const getProjects = async (search: SearchType) => {
    const res = await webApi.resourceStationApi.getVoteProjectsByHackathonId(hackathon.id, search);
    if (isInit) {
      setInitProjects(res);
    }
    setIsInit(false);
    setProjects(res);
  };

  const handleRandom = () => {
    const newProjects = randomSort(cloneDeep(projects));
    setProjects(newProjects);
  };

  const randomSort = (arr: any[]) => {
    return arr.sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    const total = hackathon.participation?.remainingVote || 0;
    if (isInit) {
      setRemainingVotes(total);
    } else {
      const voteds = voteData.reduce((pre, cur) => pre + cur.vote, 0);
      setRemainingVotes(total - voteds);
    }
  }, [hackathon, isInit, voteData]);
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <div>
        <Title title={t('hackathonVoting.votingProjects')} />
        <Filter hackathon={hackathon} handleSearch={handleSearch} handleRandom={handleRandom} />
      </div>
      <VoteCards projects={projects} />
    </div>
  );
};

export default VotingProjects;
