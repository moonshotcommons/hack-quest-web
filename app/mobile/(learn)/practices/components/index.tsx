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
import { ProjectCourseType } from '@/service/webApi/course/type';

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
    <div className="pt-4 pr-4">
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
      return webApi.courseApi.getTopCourses();
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
      className="w-full h-full overflow-auto"
      onScroll={handleScroll}
      ref={selectiveCoursesRef}
    >
      <div className="w-full mx-auto relative">
        <MobCourseListPageHeader
          title="Projects"
          description="Each elective course is relatively short and independent, with a focused topic. You will  learn how to build a project step by step."
          coverImage={coverImage}
          coverWidth={218}
          coverHeight={120}
          onSearch={onSearch}
        />
        <div className="flex flex-col w-full px-[1.25rem] py-[2.5rem] rounded-t-[2rem] absolute top-[15.5rem] left-0 z-[99] bg-neutral-off-white">
          {type === CourseFilterListType.DEFAULT && (
            <div className="flex flex-col">
              <h2 className="text-h2-mob text-neutral-black mb-5">
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
