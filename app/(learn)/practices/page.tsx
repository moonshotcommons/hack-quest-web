'use client';
import Title from '@/components/v1/Head/Title';
import { useEffect, useRef, useState } from 'react';
import CourseListPageHeader from '@/components/v2/Business/CourseListPageHeader';
import Image from 'next/image';
import CourseSlider from '@/components/v2/Business/CourseSlider';
import { CourseFilterListType } from '@/components/v2/Business/CourseFilterList';
import webApi from '@/service';
import PracticeCard from '@/components/v2/Business/PracticeCard';
import { ProjectCourseType } from '@/service/webApi/course/type';
import CourseFilterListSearch from './components/CourseFilterListSearch';
import CourseFilterListDefault from './components/CourseFilterListDefault';

function PracticesPage() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);
  const [loadNum, setLoadNum] = useState(0);
  const [apiStatus, setApiStatus] = useState('init');
  const [topProjects, setTopProjects] = useState<ProjectCourseType[]>([]);
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

  const coverImage = (
    <div className="pt-[50px]">
      <Image
        src={'/images/course/course_cover/practices_cover.png'}
        width={314}
        height={300}
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

  const loadTopCourses = () => {
    webApi.courseApi.getCourseList().then((res) => {
      setTopProjects(res.data);
    });
  };

  useEffect(() => {
    loadTopCourses();
  }, []);

  return (
    <div
      className="h-full overflow-auto"
      onScroll={handleScroll}
      ref={selectiveCoursesRef}
    >
      <Title title="Electives" />
      <div className="container mx-auto ">
        <CourseListPageHeader
          title="Projects"
          description="Practice makes perfect. Find all real-world projects here."
          coverImage={coverImage}
          coverWidth={523}
          coverHeight={277}
          onSearch={onSearch}
        ></CourseListPageHeader>

        {/* Top Projects */}
        {!!topProjects?.length && type === CourseFilterListType.DEFAULT && (
          <CourseSlider
            title="Top Projects"
            renderItem={(course) => {
              return (
                <PracticeCard
                  key={course.id}
                  course={course as ProjectCourseType}
                ></PracticeCard>
              );
            }}
            list={topProjects}
          ></CourseSlider>
        )}

        {/* CourseList */}
        {type === CourseFilterListType.DEFAULT && (
          <div className="mt-[60px]">
            <CourseFilterListDefault></CourseFilterListDefault>
          </div>
        )}

        {/* Course Search List */}
        {type === CourseFilterListType.SEARCH && (
          <CourseFilterListSearch
            keyword={searchKeyword}
          ></CourseFilterListSearch>
        )}
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

export default PracticesPage;
