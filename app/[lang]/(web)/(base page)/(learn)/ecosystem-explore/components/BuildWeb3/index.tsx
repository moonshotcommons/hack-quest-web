'use client';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import BuildCover from '@/public/images/learn/build_on_web3_cover.png';
import CourseCard from './CourseCard';
import { buildOnWeb3Data } from '../../constants/data';

interface BuildWeb3Prop {}

const BuildWeb3: React.FC<BuildWeb3Prop> = () => {
  // const [courseData, setCourseData] = useState<BuildOnWebType[]>(buildOnWeb3Data);
  // const {} = useRequest(
  //   async () => {
  //     const res = await webApi.courseApi.getCourseCount();
  //     return res;
  //   },
  //   {
  //     onSuccess(res) {
  //       const newCourseData = cloneDeep(courseData);
  //       newCourseData.map((v: BuildOnWebType) => {
  //         v.count = res[v.type];
  //       });
  //       setCourseData(newCourseData);
  //     }
  //   }
  // );
  return (
    <div className="flex flex-col gap-[32px]">
      <DeveloperTitle image={BuildCover} title={'buildWeb3'} />
      <div className="flex  gap-[32px]">
        {buildOnWeb3Data.map((course, i) => (
          <div key={i} className="flex-1 flex-shrink-0">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildWeb3;
