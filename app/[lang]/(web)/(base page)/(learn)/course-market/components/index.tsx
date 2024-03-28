'use client';
import Button from '@/components/Common/Button';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import React from 'react';
import { SearchParamsType } from '../constant/type';
import CourseList from './CourseList';
import { getSearchParamsUrl } from '@/helper/utils';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useRouter } from 'next/navigation';
import { CourseMarketApiType } from '@/service/cach/learn/course-market';

interface CourseMarketPageProp {
  page: number;
  searchParams: SearchParamsType;
  course: CourseMarketApiType;
}

const CourseMarketPage: React.FC<CourseMarketPageProp> = (props) => {
  const { searchParams } = props;
  const router = useRouter();
  const handleSearch = (searchInfo: SearchParamsType) => {
    const url = getSearchParamsUrl(searchInfo, MenuLink.COURSE_MARKET);
    router.push(url);
  };
  const buttonNode = () => {
    return (
      <Button type="primary" className="button-text-m h-[48px] w-[249px] uppercase">
        become an instructor
      </Button>
    );
  };
  return (
    <div className="container mx-auto">
      <CourseListPageHeader
        title="Course Market"
        description="Course Market is your gateway to a diverse range of courses created by HackQuest users. Explore a variety of topics and expertise levels to find the perfect learning experience for you."
        coverImageUrl={'/images/course/course_cover/elective_cover.png'}
        coverImgClassName="mt-[50px]"
        buttonNode={buttonNode()}
        coverWidth={394}
        coverHeight={300}
        onSearch={(val) => handleSearch({ keyword: val })}
        defaultValue={searchParams.keyword}
      ></CourseListPageHeader>
      <CourseList {...props} handleSearch={(search) => handleSearch({ ...search, keyword: searchParams.keyword })} />
    </div>
  );
};

export default CourseMarketPage;
