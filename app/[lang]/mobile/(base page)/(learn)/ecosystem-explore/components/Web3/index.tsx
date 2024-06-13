'use client';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import Web3Cover from '@/public/images/learn/web3_cover.png';
import DeveloperCard from '../DeveloperCard';
import { CourseDetailType } from '@/service/webApi/course/type';

interface Web3Prop {
  course: CourseDetailType;
}

const Web3: React.FC<Web3Prop> = ({ course }) => {
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <DeveloperTitle image={Web3Cover} title={'web3'} />
      <div>{course && <DeveloperCard course={course} />}</div>
    </div>
  );
};

export default Web3;
