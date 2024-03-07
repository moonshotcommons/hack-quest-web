'use client';
import { useRef, useState } from 'react';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';
import { CourseFilterListType } from '@/components/Web/Business/CourseFilterList';
import webApi from '@/service';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
// import CourseFilterListSearch from '../CourseFilterListSearch';
// import CourseFilterListDefault from '../CourseFilterListDefault';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import { Metadata } from 'next';
import MobElectiveCard from '@/components/Mobile/MobElectiveCard';
import MobViewMoreList from '@/components/Mobile/MobViewMoreList';
import MobCourseFilterListDefault from './MobCourseFilterListDefault';
import MobCourseFilterListSearch from './MobCourseFilterListSearch';
import { CourseType } from '@/service/webApi/course/type';

export const metadata: Metadata = {
  title: 'Electives'
};

function Electives() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);
  const [loadNum, setLoadNum] = useState(0);
  const [apiStatus, setApiStatus] = useState('init');
  const [topElectives, setTopElectives] = useState<ElectiveCourseType[]>([]);

  const [searchKeyword, setSearchKeyword] = useState('');

  const [type, setType] = useState<CourseFilterListType>(
    CourseFilterListType.DEFAULT
  );

  const handleScroll = () => {
    if (apiStatus !== 'init') return;
    const clientHeight = selectiveCoursesRef.current?.clientHeight || 0;
    const scrollTop = selectiveCoursesRef.current?.scrollTop || 0;
    const scrollHeight = selectiveCoursesRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setLoadNum((num) => num + 1);
    }
  };

  const onSearch = (value: string) => {
    setSearchKeyword(value);
    if (!value) {
      setType(CourseFilterListType.DEFAULT);
      return;
    }
    setType(CourseFilterListType.SEARCH);
  };

  const { loading } = useRequest(
    () => {
      return webApi.courseApi.getTopCourses<ElectiveCourseType>({
        type: `${CourseType.MINI},${CourseType.UGC}`
      });
    },
    {
      onSuccess(res) {
        setTopElectives(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  return (
    <div
      className="h-full w-full"
      onScroll={handleScroll}
      ref={selectiveCoursesRef}
    >
      <div className="relative mx-auto w-full">
        <MobCourseListPageHeader
          title="Electives"
          // description="Each elective course is relatively short and independent, with a focused topic. You will  learn how to build a project step by step."
          coverImageUrl={
            '/images/course/course_cover/elective_mobile_cover.svg'
          }
          coverWidth={120}
          coverImgClassName="top-[30px] right-4"
          coverHeight={92}
          onSearch={onSearch}
        />
        <div className="absolute left-0 top-[15.5rem] z-[10] flex w-full flex-col rounded-t-[2rem] bg-neutral-off-white px-[1.25rem] py-[2.5rem]">
          {type === CourseFilterListType.DEFAULT && (
            <div className="flex flex-col">
              <h2 className="text-h2-mob mb-5 text-neutral-black">
                Top Courses
              </h2>
              <MobViewMoreList
                list={topElectives}
                limit={2}
                renderItem={(item) => {
                  return <MobElectiveCard course={item}></MobElectiveCard>;
                }}
              ></MobViewMoreList>
            </div>
          )}
          {type === CourseFilterListType.DEFAULT && (
            <div className="pt-[40px]">
              <MobCourseFilterListDefault />
            </div>
          )}
          {type === CourseFilterListType.SEARCH && (
            <MobCourseFilterListSearch keyword={searchKeyword} />
          )}
        </div>
        {/*
        <SelectiveCoursesBox
          loadNum={loadNum}
          setApiStatus={(status) => setApiStatus(status)}
          apiStatus={apiStatus}
        /> */}
      </div>
    </div>
  );
}

export default Electives;
