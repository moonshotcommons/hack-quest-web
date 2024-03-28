'use client';
import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobLearningTrackCard from '@/components/Mobile/MobLearningTrackCard';
import { learningTrackFilters as filters } from '@/components/Web/Business/CourseFilterList/constant';
import { cloneDeep } from 'lodash-es';
import React from 'react';
import { LanguageTab, SearchInfoType } from '../../constants/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Banner from '../Banner';
import { useRouter } from 'next/navigation';
import { getSearchParamsUrl } from '@/helper/utils';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface RenderPageProp {
  learningTrackListData: LearningTrackDetailType[];
  searchInfo: SearchInfoType;
}

const RenderPage: React.FC<RenderPageProp> = ({ learningTrackListData, searchInfo }) => {
  const router = useRouter();
  const changeSearchInfo = (info: SearchInfoType) => {
    router.push(getSearchParamsUrl(info, MenuLink.LEARNING_TRACK));
  };
  return (
    <>
      <Banner changeSearchInfo={changeSearchInfo} searchInfo={searchInfo} />
      <div className="mt-[-2.5rem] rounded-t-[2rem] bg-neutral-off-white px-[1.25rem] pb-[1.25rem] pt-[1.25rem]">
        <MobCourseFilterList
          onFilterParamsUpdate={(params) => {
            changeSearchInfo({
              ...searchInfo,
              language: params.language as LanguageTab
            });
          }}
          sort={[]}
          listClassName="gap-y-6"
          radio={true}
          filters={cloneDeep(filters)}
          courseList={learningTrackListData}
          loading={false}
          renderItem={(learningTrack) => {
            return <MobLearningTrackCard key={learningTrack.id} learningTrack={learningTrack} />;
          }}
        />
      </div>
    </>
  );
};

export default RenderPage;
