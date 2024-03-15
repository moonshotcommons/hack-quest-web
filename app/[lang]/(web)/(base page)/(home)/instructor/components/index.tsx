import React from 'react';
import Content from './Content';
import Apply from './Apply';
import { CourseTab } from '../constants/type';

interface InstructorProp {
  searchParams: {
    status: CourseTab;
  };
}

const Instructor: React.FC<InstructorProp> = ({ searchParams }) => {
  return (
    <>
      {true ? (
        <Apply />
      ) : (
        <Content status={searchParams.status || CourseTab.DRAFT} />
      )}
    </>
  );
};

export default Instructor;
