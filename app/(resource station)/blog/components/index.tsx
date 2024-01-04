'use client';
import BlogBanner from './BlogBanner';
import { searchTabData, sortData } from './BlogBanner/data';
import BlogList from './BlogList';
import FeatureBlog from './FeatureBlog';
import Pagination from '@/components/v2/Common/Pagination';
import React, { useEffect, useState } from 'react';
import {
  BlogSearchType,
  BlogType
} from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import Loading from '@/components/v2/Common/Loading';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

interface BlogProp {}

const Blog: React.FC<BlogProp> = () => {
  const [searchInfo, setSearchInfo] = useState<BlogSearchType>({
    keyword: '',
    category: searchTabData[0].value,
    sort: sortData[0].value,
    page: 1,
    limit: 12
  });

  const [loading, setLoading] = useState(false);

  const [totalPage, setTotalPage] = useState(1);
  const [totalList, setTotalList] = useState(0);
  const [isInit, setIsInit] = useState(true);
  const [blogList, setBlogList] = useState<BlogType[]>([]);
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const changeSearchInfo = (info: BlogSearchType) => {
    setSearchInfo({ ...info, page: 1 });
  };

  const getBlogList = () => {
    return new Promise((resolve) => {
      webApi.resourceStationApi
        .getBlog(searchInfo)
        .then((res) => {
          setBlogList(res.data || []);
          setTotalList(res.total);
          setTotalPage(Math.ceil(res.total / searchInfo.limit));
        })
        .finally(() => {
          resolve(true);
        });
    });
  };

  const getFeatureBlog = () => {
    return new Promise((resolve) => {
      webApi.resourceStationApi
        .getFeaturedBlog()
        .then((res) => {
          setFeatureBlogList(res);
        })
        .finally(() => {
          resolve(true);
        });
    });
  };

  useEffect(() => {
    if (!isInit) {
      setLoading(true);
      getBlogList().finally(() => {
        setLoading(false);
      });
    }
  }, [searchInfo]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getBlogList(), getFeatureBlog()]).finally(() => {
      setLoading(false);
      setIsInit(false);
    });
  }, []);
  return (
    <div>
      <BlogBanner searchInfo={searchInfo} changeSearchInfo={changeSearchInfo} />
      <div className="container mx-auto py-[70px]">
        <Loading loading={loading}>
          {searchInfo.keyword ? (
            <div className="text-[#0b0b0b] text-[24px] font-next-book mb-[40px] text-center">
              {totalList} {totalList > 1 ? 'Results' : 'Result'} for
              <span className="text-[#8c8c8c]">“{searchInfo.keyword}”</span>
            </div>
          ) : (
            <FeatureBlog list={featureBlogList} />
          )}

          <BlogList list={blogList} />
          {totalPage > 1 && (
            <div className="flex justify-center mt-[80px]">
              <Pagination
                page={searchInfo.page}
                onPageChange={(page) => {
                  setSearchInfo({ ...searchInfo, page });
                }}
                total={totalPage}
              />
            </div>
          )}
        </Loading>
      </div>
      <PageRetentionTime trackName="blog-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default Blog;
