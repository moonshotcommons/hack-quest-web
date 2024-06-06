'use client';
import React, { useState } from 'react';
import DeveloperTitle from '../DeveloperTitle';
import Web3Cover from '@/public/images/learn/web3_cover.png';
import DeveloperCard from '../DeveloperCard';
import { CourseDetailType } from '@/service/webApi/course/type';
import { introWeb3MockCourseId } from '@/app/[lang]/(web)/(base page)/(learn)/ecosystem-explore/constants/data';
import { useRequest } from 'ahooks';
import webApi from '@/service';

interface Web3Prop {}

const Web3: React.FC<Web3Prop> = ({}) => {
  const [cousre, setCourse] = useState<CourseDetailType>();
  const {} = useRequest(
    async () => {
      const res = await webApi.courseApi.getCourseDetail(introWeb3MockCourseId);
      return res;
    },
    {
      onSuccess(res) {
        setCourse(res);
      }
    }
  );
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <DeveloperTitle image={Web3Cover} title={'web3'} />
      <div>{cousre && <DeveloperCard course={cousre} />}</div>
    </div>
  );
};

export default Web3;
