import { FC } from 'react';
import { Metadata } from 'next';
import LearningTrack from './components';

export const metadata: Metadata = {
  title: 'Learning Tracks'
};

interface LearningTrackPageProps {}

const LearningTrackPage: FC<LearningTrackPageProps> = (props) => {
  return (
    <>
      <LearningTrack />
    </>
  );
};

export default LearningTrackPage;
