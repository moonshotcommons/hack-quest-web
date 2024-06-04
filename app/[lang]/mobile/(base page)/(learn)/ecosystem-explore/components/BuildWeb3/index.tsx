'use client';
import React, { useState } from 'react';
import DeveloperTitle from '../DeveloperTitle';
import BuildCover from '@/public/images/learn/build_on_web3_cover.png';
import CourseCard from './CourseCard';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import webApi from '@/service';
import { BuildOnWebType } from '@/app/[lang]/(web)/(base page)/(learn)/ecosystem-explore/constants/type';
import { buildOnWeb3Data } from '@/app/[lang]/(web)/(base page)/(learn)/ecosystem-explore/constants/data';

interface BuildWeb3Prop {
  ecosystems: EcosystemType[];
}

const BuildWeb3: React.FC<BuildWeb3Prop> = ({ ecosystems }) => {
  const [courseData, setCourseData] = useState<BuildOnWebType[]>(buildOnWeb3Data);
  const {} = useRequest(
    async () => {
      const res = await webApi.courseApi.getCourseCount();
      return res;
    },
    {
      onSuccess(res) {
        const newCourseData = cloneDeep(courseData);
        newCourseData.map((v: BuildOnWebType) => {
          v.count = res[v.type];
        });
        setCourseData(newCourseData);
      }
    }
  );
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <DeveloperTitle image={BuildCover} title={'buildWeb3'} />
      <div className="flex flex-col  gap-[1.25rem]">
        {courseData.map((course, i) => (
          <CourseCard key={i} ecosystems={ecosystems} course={course} />
        ))}
      </div>
    </div>
  );
};

export default BuildWeb3;
