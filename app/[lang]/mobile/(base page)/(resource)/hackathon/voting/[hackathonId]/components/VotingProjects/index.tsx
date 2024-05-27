'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import Filter, { SearchType } from './Filter';
import VoteCards from './VoteCards';
import { HackathonVoteContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import webApi from '@/service';
import { cloneDeep } from 'lodash-es';
import Loading from '@/components/Common/Loading';
import SearchTxt from './SearchTxt';
import Title from '../../../../[hackathonId]/components/components/Title';
import { FilterRef } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/voting/[hackathonId]/components/VotingProjects/Filter';

interface VotingProjectsProp {
  hackathon: HackathonType;
}

const VotingProjects: React.FC<VotingProjectsProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setInitProjects, setRemainingVotes, voteData, setVoteData } = useContext(HackathonVoteContext);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isInit, setIsInit] = useState(true);
  const [searchParam, setSearchParam] = useState<SearchType>();
  const filterRef = useRef<FilterRef>(null);
  const [loading, setLoading] = useState(false);
  const handleSearch = (search: SearchType) => {
    setSearchParam(search);
    getProjects(search);
    setVoteData([]);
  };
  const getProjects = async (search: SearchType) => {
    setLoading(true);
    const res = await webApi.resourceStationApi.getVoteProjectsByHackathonId(hackathon.id, search);
    if (isInit) {
      setInitProjects(res);
    }
    setLoading(false);
    setIsInit(false);
    setProjects(res);
  };

  const handleRandom = () => {
    const newProjects = randomSort(cloneDeep(projects));
    setProjects(newProjects);
  };

  const handleReset = () => {
    filterRef.current?.handleReset();
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
        <Filter hackathon={hackathon} ref={filterRef} handleSearch={handleSearch} handleRandom={handleRandom} />
      </div>
      <Loading loading={loading}>
        <SearchTxt projects={projects} keyword={searchParam?.keyword || ''} handleReset={handleReset} />
        <VoteCards projects={projects} />
      </Loading>
    </div>
  );
};

export default VotingProjects;
