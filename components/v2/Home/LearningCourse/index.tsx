import React from 'react';
import PageDescription from '@/components/v2/PageDescription';
import Course from './Course';

function LearningCourse() {
  return (
    <div className="pb-10 font-next-book-Thin text-home-default-color container mx-auto">
      <PageDescription title={'Welcome xxxx'} description={'description'} />
      <Course />
    </div>
  );
}

export default LearningCourse;
