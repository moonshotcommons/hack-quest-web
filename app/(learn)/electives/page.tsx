'use client';
import { useEffect, useRef, useState } from 'react';
import CourseListPageHeader from '@/components/v2/Business/CourseListPageHeader';
import CourseSlider from '@/components/v2/Business/CourseSlider';
import CourseFilterList, {
  CourseFilterListType
} from '@/components/v2/Business/CourseFilterList';
import webApi from '@/service';
import { cloneDeep } from 'lodash-es';
import ElectiveCard from '@/components/v2/Business/ElectiveCard';
import { MiniElectiveCourseType } from '@/service/webApi/elective/type';

function ElectivesPage() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);
  const [loadNum, setLoadNum] = useState(0);
  const [apiStatus, setApiStatus] = useState('init');
  const [topProjects, setTopProjects] = useState<MiniElectiveCourseType[]>([]);
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

  const loadTopCourses = () => {
    webApi.electiveApi.getElectives({}).then((res) => {
      setTopProjects(res.data);
    });
  };

  useEffect(() => {
    loadTopCourses();
  }, []);

  const filters = [
    {
      filterName: 'Language',
      filterField: 'language',
      options: [
        { name: 'Solidity', value: 'Solidity', isSelect: false },
        { name: 'Rust', value: 'Rust', isSelect: false },
        { name: 'Move ', value: 'Move ', isSelect: false }
      ]
    },
    {
      filterName: 'Track',
      filterField: 'track',
      options: [
        { name: 'DeFi', value: 'DeFi', isSelect: false },
        { name: 'NFT', value: 'NFT', isSelect: false },
        { name: 'Data', value: 'Data', isSelect: false }
      ]
    },
    {
      filterName: 'Difficulty',
      filterField: 'level',
      options: [
        { name: 'Beginner', value: 'BEGINNER', isSelect: false },
        { name: 'Intermediate', value: 'INTERMEDIATE', isSelect: false },
        { name: 'Advanced', value: 'ADVANCED', isSelect: false }
      ]
    }
  ];

  const sort = [
    { name: 'Most Popular', value: 'Most Popular', isSelect: false },
    { name: 'Newest', value: 'Newest', isSelect: true }
  ];

  return (
    <div
      className="h-full overflow-auto"
      onScroll={handleScroll}
      ref={selectiveCoursesRef}
    >
      <div className="container mx-auto ">
        <CourseListPageHeader
          title="Electives"
          description="Each elective course is relatively short and independent, with a focused topic. You will  learn how to build a project step by step."
          coverImageUrl={'/images/course/course_cover/elective_cover.png'}
          coverWidth={523}
          coverHeight={277}
          onSearch={() => {}}
        ></CourseListPageHeader>
        {!!topProjects?.length && type === CourseFilterListType.DEFAULT && (
          <CourseSlider
            title="Top Projects"
            renderItem={(course) => {
              return (
                <ElectiveCard
                  key={course.id}
                  course={course as MiniElectiveCourseType}
                ></ElectiveCard>
              );
            }}
            list={topProjects}
          ></CourseSlider>
        )}
        {type === CourseFilterListType.DEFAULT && (
          <div className="mt-[60px]">
            <CourseFilterList
              title="Explore Web 3"
              courseList={topProjects}
              filters={cloneDeep(filters)}
              onFiltersUpdate={() => {}}
              onSortUpdate={() => {}}
              sort={sort}
              renderItem={(course) => {
                return (
                  <ElectiveCard
                    key={course.id}
                    course={course as MiniElectiveCourseType}
                  ></ElectiveCard>
                );
              }}
            ></CourseFilterList>
          </div>
        )}
        {type === CourseFilterListType.SEARCH && (
          <CourseFilterList
            onSortUpdate={() => {}}
            onFiltersUpdate={() => {}}
            filters={cloneDeep(filters)}
            title={`Search result for “${searchKeyword}”`}
            courseList={[]}
            renderItem={(course) => {
              return (
                <ElectiveCard
                  key={course.id}
                  course={course as MiniElectiveCourseType}
                ></ElectiveCard>
              );
            }}
          ></CourseFilterList>
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

export default ElectivesPage;
