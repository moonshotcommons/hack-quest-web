import React from 'react';
import LearningTrackWelcome from '@/components/v2/LearningTrackWelcome';
import Course from './Course';

function HomeTop() {
  return (
    <div className="py-10 font-next-book-Thin text-home-default-color">
      <LearningTrackWelcome />
      <Course />
    </div>
  );
}

export default HomeTop;
