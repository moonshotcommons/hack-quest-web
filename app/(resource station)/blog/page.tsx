'use client';
import Title from '@/components/v1/Head/Title';
import BlogBanner from './/BlogBanner';
import { searchTabData, sortData } from './/BlogBanner/data';
import BlogList from './/BlogList';
import FeatureBlog from './/FeatureBlog';
import Pagination from '@/components/v2/Common/Pagination';
import { BurialPoint } from '@/helper/burialPoint';
import React, { useEffect, useState } from 'react';

interface BlogProp {}

export interface SearchInfoType {
  inputValue: string;
  tab: string;
  sort: string;
  page: number;
}

const Blog: React.FC<BlogProp> = () => {
  const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
    inputValue: '',
    tab: searchTabData[0].value,
    sort: sortData[0].value,
    page: 1
  });
  const changeSearchInfo = (info: SearchInfoType) => {
    setSearchInfo({ ...info, page: 1 });
  };

  useEffect(() => {
    console.info(searchInfo);
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('blog-页面留存时间', {
        duration
      });
    };
  }, [searchInfo]);
  return (
    <div>
      <Title title="Blog" />
      <BlogBanner searchInfo={searchInfo} changeSearchInfo={changeSearchInfo} />
      <div className="container mx-auto py-[70px]">
        <FeatureBlog />
        <BlogList />
        <div className="flex justify-center mt-[80px]">
          <Pagination
            page={1}
            onPageChange={(page) => {
              setSearchInfo({ ...searchInfo, page });
            }}
            total={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
