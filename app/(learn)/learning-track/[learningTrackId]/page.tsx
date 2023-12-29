'use client';

import Loading from '@/components/v2/Common/Loading';
import LearningTrackDetail from '@/components/v2/DetailPage/LearningTrackDetail';
import { useGetLearningTrackDetail } from '@/hooks/useLearningTrackHooks/useLearningTrackDetail';
import type { NextPage } from 'next';
interface IProps {}

const LearningTrackDetailPage: NextPage<IProps> = (props) => {
  const { learningTrackDetail, refresh } = useGetLearningTrackDetail();
  return (
    <div className="container mx-auto">
      <Loading loading={!learningTrackDetail} className="mt-[50vh]">
        <LearningTrackDetail
          learningTrackDetail={learningTrackDetail}
          refresh={refresh}
        ></LearningTrackDetail>
      </Loading>
    </div>
  );
};

export default LearningTrackDetailPage;
