import { FC } from 'react';
import LearningTrack from './components/LearningTrack';
import { Metadata } from 'next';

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
