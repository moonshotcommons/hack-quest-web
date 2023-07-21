// ./pages/article/[articleId].tsx
import CourseDescription from '@/components/Course/CourseDetail/CourseDescription';
import CourseDetailBanner from '@/components/Course/CourseDetail/CourseDetailBranner';
import CourseDetailInfo from '@/components/Course/CourseDetail/CouseDetailInfo';
import TrackList from '@/components/Course/TrackList';
import UnitList from '@/components/Course/UnitList';
import { Block } from '@/components/TempComponent/Block';
import { tagFormate } from '@/helper/formate';
import { useEnrollUnEnroll } from '@/hooks/useLearningTrackHooks/useEnrollUnEnroll';
import { useGetLearningTrackDetail } from '@/hooks/useLearningTrackHooks/useLearningTrackDetail';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
import wrapper, { AppRootState } from '@/store/redux';
import { useDebounceFn, useRequest } from 'ahooks';
import { Typography, message } from 'antd';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

interface IProps {}

const LearningTrackDetail: NextPage<IProps> = (props) => {
  const ref = useRef();
  const { learningTrackDetail, refresh } = useGetLearningTrackDetail();
  const { enroll, unEnroll } = useEnrollUnEnroll(learningTrackDetail, refresh);
  return (
    <div className="px-[5.5rem]">
      <CourseDetailBanner
        courseDetail={learningTrackDetail as any}
        jumpRef={ref}
      >
        <>
          {learningTrackDetail?.enrolled && (
            <div className="text-[#676767] text-[1rem] leading-[120%] font-next-book mt-[1.875rem]">
              <span>{`You have enrolled this course, click to `}</span>
              <span className="underline cursor-pointer" onClick={unEnroll}>
                cancel enrollment
              </span>
            </div>
          )}

          {!learningTrackDetail?.enrolled && (
            <button
              className="px-8 w-fit py-4 mt-[1.875rem] border border-solid border-[#F2F2F2] rounded-[2.5rem] text-sm text-[#F2F2F2] primary-button-hover cursor-pointer"
              onClick={enroll}
            >
              Enroll
            </button>
          )}
        </>
      </CourseDetailBanner>

      <CourseDetailInfo courseDetail={learningTrackDetail}></CourseDetailInfo>
      <div className="mt-[4rem]">
        <CourseDescription>
          {learningTrackDetail?.aboutDesc &&
            learningTrackDetail?.aboutDesc?.map((item: any) => {
              return <Block key={item.id} block={item}></Block>;
            })}
        </CourseDescription>
      </div>
      <h2
        className="text-[#F2F2F2] font-next-book text-[1.75rem] mt-[4rem]"
        ref={ref as any}
      >
        Track Details
      </h2>
      <div className="mt-[2.5rem]">
        <TrackList trackDetail={learningTrackDetail as any}></TrackList>
      </div>
    </div>
  );
};

export default LearningTrackDetail;
