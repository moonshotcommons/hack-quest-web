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
import MobLearningTrackCard from './MobLearningTrackCard';
import { cloneDeep } from 'lodash-es';

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
  const { run: getLearningTrackList, loading } = useRequest(async (param) => {
    const list = await webApi.learningTrackApi.getLearningTracks(param);
    setLearningTrackListData(list);
  });

  useEffect(() => {
    getLearningTrackList(searchInfo);
  }, [searchInfo, getLearningTrackList]);
  return (
    <div className="">
      <Banner changeSearchInfo={changeSearchInfo} searchInfo={searchInfo} />
      <div className="px-[1.25rem] pt-[1.25rem] mt-[-2.5rem] pb-[1.25rem] bg-neutral-off-white rounded-t-[2rem]">
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
