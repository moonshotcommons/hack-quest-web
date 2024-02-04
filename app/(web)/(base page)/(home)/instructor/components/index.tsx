import React from 'react';
import Content from './Content';
import Apply from './Apply';

interface InstructorProp {
  searchParams: any;
}

const Instructor: React.FC<InstructorProp> = ({ searchParams }) => {
  return <>{false ? <Apply /> : <Content />}</>;
};

export default Instructor;
