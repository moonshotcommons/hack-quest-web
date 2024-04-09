'use client';
import React from 'react';
import Banner from '../Banner';
import Filter from '../Filter';
import List from '../List';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { SearchInfoType } from '../../constants/type';
import { useRouter } from 'next/navigation';

interface RenderPageProp {
  learningTrackListData: LearningTrackDetailType[];
  searchInfo: SearchInfoType;
}

const RenderPage: React.FC<RenderPageProp> = ({ learningTrackListData, searchInfo }) => {
  const router = useRouter();
  return (
    <>
      <Banner searchInfo={searchInfo} />
      <div className="container mx-auto bg-[var(--neutral-off-white)] pb-[100px] pt-[40px]">
        <div className="mb-[32px]">
          <Filter searchInfo={searchInfo} />
        </div>
        {/* <Loading loading={loading} className="container"> */}
        <List list={learningTrackListData} />

        {/* </Loading> */}
      </div>
    </>
  );
};

export default RenderPage;
