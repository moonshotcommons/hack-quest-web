'use client';
import { useEffect, useState } from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { bannerTabList } from '../constants/data';
import { LanguageTab, SearchInfoType } from '../constants/type';
import Banner from './Banner';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import { learningTrackFilters as filters } from '@/components/Web/Business/CourseFilterList/constant';
import { cloneDeep } from 'lodash-es';
import MobLearningTrackCard from '@/components/Mobile/MobLearningTrackCard';

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
  const { run: getLearningTrackList, loading } = useRequest(
    async (param) => {
      const list = await webApi.learningTrackApi.getLearningTracks(param);
      setLearningTrackListData(list);
    },
    {
      manual: true
    }
  );

  useEffect(() => {
    getLearningTrackList(searchInfo);
  }, [searchInfo, getLearningTrackList]);
  return (
    <div className="">
      <Banner changeSearchInfo={changeSearchInfo} searchInfo={searchInfo} />
      <div className="mt-[-2.5rem] rounded-t-[2rem] bg-neutral-off-white px-[1.25rem] pb-[1.25rem] pt-[1.25rem]">
        <MobCourseFilterList
          onFilterParamsUpdate={(params) => {
            getLearningTrackList({
              ...searchInfo,
              language: params.language
            });
          }}
          sort={[]}
          listClassName="gap-y-6"
          radio={true}
          filters={cloneDeep(filters)}
          courseList={learningTrackListData}
          loading={loading}
          renderItem={(learningTrack) => {
            return (
              <MobLearningTrackCard
                key={learningTrack.id}
                learningTrack={learningTrack}
              />
            );
          }}
        />
      </div>
      <PageRetentionTime trackName="home-learning-页面留存时间"></PageRetentionTime>
    </div>
  );
}

export default LearningTrack;
