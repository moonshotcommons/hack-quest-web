'use client';
import Banner from './Banner';
import Loading from '@/components/v2/Common/Loading';
import { bannerTabList, filterList } from './data';
import { useEffect, useState } from 'react';
import { SearchInfoType } from './type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import List from './List';
import Filter from './Filter';
function LearningTrack() {
  const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
    tab: bannerTabList[0].value,
    filter: filterList[0].value
  });
  const [learningTrackListData, setLearningTrackListData] = useState<
    LearningTrackDetailType[]
  >([]);
  const changeSearchInfo = (info: SearchInfoType) => {
    setSearchInfo({ ...info });
  };
  const { run, loading } = useRequest(async () => {
    const list = await webApi.learningTrackApi.getLearningTracks();
    setLearningTrackListData(list);
  });

  useEffect(() => {
    run();
  }, [searchInfo, run]);
  return (
    <div className="">
      <Banner changeSearchInfo={changeSearchInfo} searchInfo={searchInfo} />
      <div className="container mx-auto pt-[40px] pb-[100px] bg-[#F4F4F4]">
        <div className="mb-[32px]">
          <Filter changeSearchInfo={changeSearchInfo} searchInfo={searchInfo} />
        </div>
        <Loading loading={loading} className="container">
          <List list={learningTrackListData} />
        </Loading>
      </div>
    </div>
  );
}

export default LearningTrack;
