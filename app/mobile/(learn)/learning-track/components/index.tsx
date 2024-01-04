'use client';
import Loading from '@/components/v2/Common/Loading';
import { useEffect, useState } from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { bannerTabList } from '../constants/data';
import { LanguageTab, SearchInfoType } from '../constants/type';
import Banner from './Banner';
import Filter from './Filter';
import List from './List';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

function LearningTrack() {
  const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
    track: bannerTabList[0].value,
    language: LanguageTab.ALL
  });
  const [learningTrackListData, setLearningTrackListData] = useState<
    LearningTrackDetailType[]
  >([]);
  const changeSearchInfo = (info: SearchInfoType) => {
    setSearchInfo({ ...info });
  };
  const { run, loading } = useRequest(async () => {
    const param = {
      ...searchInfo,
      language:
        searchInfo.language === LanguageTab.ALL ? '' : searchInfo.language
    };
    const list = await webApi.learningTrackApi.getLearningTracks(param);
    setLearningTrackListData(list);
  });

  useEffect(() => {
    run();
  }, [searchInfo, run]);
  return (
    <div className="">
      <Banner changeSearchInfo={changeSearchInfo} searchInfo={searchInfo} />
      <div className="px-[1.25rem] pt-[2.5rem] mt-[-2.5rem] pb-[1.25rem] bg-neutral-off-white rounded-t-[2rem]">
        <div className="mb-[1.25rem]">
          <Filter changeSearchInfo={changeSearchInfo} searchInfo={searchInfo} />
        </div>
        <Loading loading={loading} className="container">
          <List list={learningTrackListData} loading={loading} />
        </Loading>
      </div>
      <PageRetentionTime trackName="home-learning-页面留存时间"></PageRetentionTime>
    </div>
  );
}

export default LearningTrack;
