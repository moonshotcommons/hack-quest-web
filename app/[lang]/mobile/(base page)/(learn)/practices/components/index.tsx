'use client';
import { useRef, useState } from 'react';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';
import { CourseFilterListType } from '@/components/Web/Business/CourseFilterList';
import webApi from '@/service';
// import CourseFilterListSearch from '../CourseFilterListSearch';
// import CourseFilterListDefault from '../CourseFilterListDefault';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import { Metadata } from 'next';
import MobViewMoreList from '@/components/Mobile/MobViewMoreList';
import MobCourseFilterListDefault from './MobCourseFilterListDefault';
import MobCourseFilterListSearch from './MobCourseFilterListSearch';
import MobPracticeCard from '@/components/Mobile/MobPracticeCard';
import Image from 'next/image';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';

export const metadata: Metadata = {
  title: 'Electives'
};

function Electives() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [topProjects, setTopProjects] = useState<ProjectCourseType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [type, setType] = useState<CourseFilterListType>(
    CourseFilterListType.DEFAULT
  );

  const handleScroll = () => {
    const clientHeight = selectiveCoursesRef.current?.clientHeight || 0;
    const scrollTop = selectiveCoursesRef.current?.scrollTop || 0;
    const scrollHeight = selectiveCoursesRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setPage((num) => num + 1);
    }
  };

  const coverImage = (
    <div className="pr-4 pt-4">
      <Image
        src={'/images/course/course_cover/practices_cover.png'}
        width={126}
        height={120}
        alt="Projects cover"
      ></Image>
    </div>
  );

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
      return webApi.courseApi.getTopCourses<ProjectCourseType>({
        type: CourseType.GUIDED_PROJECT
      });
    },
    {
      onSuccess(res) {
        setTopProjects(res);
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
          title="Projects"
          // description="Each elective course is relatively short and independent, with a focused topic. You will  learn how to build a project step by step."
          coverImage={coverImage}
          coverWidth={218}
          coverHeight={120}
          onSearch={onSearch}
        />
        <div className="absolute left-0 top-[15.5rem] z-[10] flex w-full flex-col rounded-t-[2rem] bg-neutral-off-white px-[1.25rem] py-[2.5rem]">
          {type === CourseFilterListType.DEFAULT && (
            <div className="flex flex-col">
              <h2 className="text-h2-mob mb-5 text-neutral-black">
                Top Projects
              </h2>
              <MobViewMoreList
                list={topProjects}
                limit={2}
                renderItem={(item) => {
                  return <MobPracticeCard course={item}></MobPracticeCard>;
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
