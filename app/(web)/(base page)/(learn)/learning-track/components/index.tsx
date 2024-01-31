'use client';
import Loading from '@/components/Common/Loading';
import { useEffect, useState } from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { bannerTabList } from '../constants/data';
import {
  LanguageTab,
  LearningTrackTab,
  SearchInfoType
} from '../constants/type';
import Banner from './Banner';
import Filter from './Filter';
import List from './List';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
function LearningTrack() {
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const track = query.get('track') as LearningTrackTab;
  const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
    track: track || bannerTabList[0].value,
    language: LanguageTab.ALL
  });
  const [learningTrackListData, setLearningTrackListData] = useState<
    LearningTrackDetailType[]
  >([]);
  const changeSearchInfo = (info: SearchInfoType) => {
    setSearchInfo({ ...info });
  };
  const { run, loading } = useRequest(async () => {
    const list = await webApi.learningTrackApi.getLearningTracks(searchInfo);
    setLearningTrackListData(list);
  });

  useEffect(() => {
    run();
  }, [searchInfo, run]);
  return (
    <div className="">
      <Banner changeSearchInfo={changeSearchInfo} searchInfo={searchInfo} />
      <div className="container mx-auto bg-[var(--neutral-off-white)] pb-[100px] pt-[40px]">
        <div className="mb-[32px]">
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
