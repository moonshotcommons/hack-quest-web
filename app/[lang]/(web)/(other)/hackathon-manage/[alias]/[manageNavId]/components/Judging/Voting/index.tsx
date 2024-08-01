'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  judgingAllFixedInformationData,
  judgingJudgeFixedInformationData,
  judgingJudgeScoreInformationData,
  hackathonSortData,
  applicationTabData
} from '../../../../../constants/data';
import { SelectType } from '../../../../../constants/type';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import { HackathonJugingInfoType, HackathonManageApplicationType } from '@/service/webApi/resourceStation/type';
import Search from '../../Search';
import CommonTable from './CommonTable';
import { arraySortByKey } from '@/helper/utils';

interface VotingProp {
  judgeInfo: HackathonJugingInfoType;
}

const Voting: React.FC<VotingProp> = ({ judgeInfo }) => {
  const [searchInfo, setSearchInfo] = useState({
    status: applicationTabData[0].value,
    sort: hackathonSortData[0].value,
    keyword: ''
  });
  const list = judgeInfo?.projects || [];
  const [tableList, setTableList] = useState<HackathonManageApplicationType[]>([]);

  const tableInformation = useMemo(() => {
    const judge = judgeInfo?.reward?.judge;
    if (judge?.judgeMode === 'all' && judge?.voteMode === 'fixed') {
      return judgingAllFixedInformationData;
    }
    if (judge?.judgeMode === 'judges' && judge?.voteMode === 'fixed') {
      return judgingJudgeFixedInformationData;
    }
    return judgingJudgeScoreInformationData;
  }, [judgeInfo]);

  const handleSearch = (key: 'sort' | 'keyword', value: string) => {
    setSearchInfo({
      ...searchInfo,
      [key]: value
    });
  };

  const refreshTableList = () => {
    const { keyword, sort } = searchInfo;
    const newList = list.filter((v) => v.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
    const sortList = arraySortByKey(newList, sort);
    setTableList(sortList);
  };

  useEffect(() => {
    refreshTableList();
  }, [searchInfo, list]);

  return (
    <div className="flex flex-1 flex-col gap-[24px]">
      <Search
        sorts={hackathonSortData}
        sort={searchInfo.sort}
        handleSearch={handleSearch}
        tableInformation={tableInformation.map((v) => v.value)}
      />
      <CommonTable loading={false} list={tableList} information={tableInformation} status={searchInfo.status} />
    </div>
  );
};

export default Voting;
