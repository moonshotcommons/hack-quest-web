'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  judgingAllFixedInformationData,
  judgingJudgeFixedInformationData,
  judgingJudgeScoreInformationData,
  hackathonSortData
} from '../../../../../constants/data';
import { HackathonJudgeProjectType, HackathonJugingInfoType } from '@/service/webApi/resourceStation/type';
import Search, { SearchParams } from '../../Search';
import CommonTable from './CommonTable';
import { arraySortByKey } from '@/helper/utils';
import { MultiSelectOption } from '../../../../../components/MultiSelect';

interface VotingProp {
  judgeInfo: HackathonJugingInfoType;
  loading: boolean;
  tracks: MultiSelectOption[];
}

const Voting: React.FC<VotingProp> = ({ judgeInfo, loading, tracks }) => {
  const [searchInfo, setSearchInfo] = useState({
    sort: hackathonSortData[0].value,
    tracks: [] as string[],
    keyword: ''
  });
  const [tableList, setTableList] = useState<HackathonJudgeProjectType[]>([]);

  const tableInformation = useMemo(() => {
    const judge = judgeInfo?.reward?.judge;
    if (judge?.judgeMode === 'all' && judge?.voteMode === 'fixed') {
      return judgingAllFixedInformationData;
    }
    if (judge?.judgeMode === 'judges' && judge?.voteMode === 'fixed') {
      return judgingJudgeFixedInformationData;
    }
    const scores = judgeInfo?.projects?.[0]?.votes?.scores || [];
    const scoresTableInformation = scores.map((v, i) => ({
      disable: true,
      value: `score-${i}`,
      label: `Score ${i + 1}`
    }));
    const judgingJudgeScoreInformation = structuredClone(judgingJudgeScoreInformationData);
    judgingJudgeScoreInformation.splice(3, 0, ...scoresTableInformation);
    return judgingJudgeScoreInformation;
  }, [judgeInfo]);

  const handleSearch = (key: SearchParams, value: string) => {
    setSearchInfo({
      ...searchInfo,
      [key]: value
    });
  };

  const refreshTableList = () => {
    const { keyword, sort, tracks } = searchInfo;
    const newList = judgeInfo?.projects?.filter((v) => {
      const isKeywordMatch = v.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
      const isTrackMatch = tracks.every((track) => v.tracks.includes(track));
      return isKeywordMatch && isTrackMatch;
    });
    const sortList = arraySortByKey(newList, sort);
    setTableList(sortList);
  };

  useEffect(() => {
    refreshTableList();
  }, [searchInfo, judgeInfo]);

  return (
    <div className="flex flex-1 flex-col gap-[24px]">
      <Search
        sorts={hackathonSortData}
        sort={searchInfo.sort}
        handleSearch={handleSearch}
        sectors={[
          {
            name: 'Sector',
            options: tracks,
            value: searchInfo.tracks,
            key: 'tracks',
            type: 'checkbox'
          }
        ]}
        tableInformation={tableInformation.map((v) => v.value)}
      />
      <CommonTable loading={loading} list={tableList} information={tableInformation} />
    </div>
  );
};

export default Voting;
