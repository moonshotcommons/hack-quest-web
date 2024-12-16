'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useRef, useState } from 'react';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import VoteCards from './VoteCards';
import { HackathonVoteContext } from '../../../../constants/type';
import webApi from '@/service';
import { cloneDeep } from 'lodash-es';
import SearchTxt from './SearchTxt';
import Loading from '@/components/Common/Loading';
import Title from '../../../../components/HackathonDetail/Title';
import Tips from './Tips';
import Filter, { FilterRef, SearchType } from './Filter';
import TickIconTips from './TickIconTips';

interface VotingProjectsProp {
  hackathon: HackathonType;
}

const VotingProjects: React.FC<VotingProjectsProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setRemainingVotes, voteData, setVoteData, setTotalLeftVotes, totalLeftVotes, setJudgeInfo, judgeInfo } =
    useContext(HackathonVoteContext);
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
    const res = await webApi.resourceStationApi.getHackathonVoteProjects({
      hackathonId: hackathon.id,
      params: search
    });
    if (isInit) {
      setJudgeInfo(res);
      const totalLeftVotes = res?.remainingVotes || 0;
      setTotalLeftVotes(totalLeftVotes);
      setRemainingVotes(totalLeftVotes);
    }
    setLoading(false);
    setIsInit(false);
    setProjects(res?.projects || []);
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
  // useEffect(() => {
  //   if (judgeInfo?.judge?.voteMode === 'fixed' && !isInit) {
  //     const voteds = voteData.reduce((pre, cur) => pre + cur.vote, 0);
  //     setRemainingVotes(totalLeftVotes - voteds);
  //   }
  // }, [judgeInfo, isInit, voteData]);

  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('hackathonVoting.votingProjects')} />
      <Tips />
      <Filter hackathon={hackathon} ref={filterRef} handleSearch={handleSearch} handleRandom={handleRandom} />
      <TickIconTips />
      <Loading loading={loading}>
        <SearchTxt projects={projects} keyword={searchParam?.keyword || ''} handleReset={handleReset} />
        <VoteCards projects={projects} />
      </Loading>
    </div>
  );
};

export default VotingProjects;
