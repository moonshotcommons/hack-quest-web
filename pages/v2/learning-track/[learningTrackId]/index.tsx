// ./pages/article/[articleId].tsx

import LearningTrackDetail from '@/components/v2/DetailPage/LearningTrackDetail';
import { useEnrollUnEnroll } from '@/hooks/useLearningTrackHooks/useEnrollUnEnroll';
import { useGetLearningTrackDetail } from '@/hooks/useLearningTrackHooks/useLearningTrackDetail';
import type { NextPage } from 'next';
import { useRef } from 'react';

interface IProps {}

const LearningTrackDetailPage: NextPage<IProps> = (props) => {
  const ref = useRef();
  const { learningTrackDetail, refresh } = useGetLearningTrackDetail();
  const { enroll, unEnroll } = useEnrollUnEnroll(learningTrackDetail, refresh);
  if (!learningTrackDetail) return null;
  return (
    <div className="container mx-auto">
      <LearningTrackDetail
        learningTrackDetail={learningTrackDetail}
      ></LearningTrackDetail>
    </div>
  );
};

export default LearningTrackDetailPage;
