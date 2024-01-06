'use client';
import React, { useEffect } from 'react';
import BlogHeader from '../BlogHeader';
import BlogContent from '../BlogContent';
import BlogFooter from '../BlogFooter';
import { BurialPoint } from '@/helper/burialPoint';
import { useParams } from 'next/navigation';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import Loading from '@/components/Common/Loading';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

interface BlogDetailProp {}

const BlogDetail: React.FC<BlogDetailProp> = () => {
  const { blogId } = useParams();
  const { data: blog = {} as BlogDetailType, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getBlogDetail(
        blogId as string
      );
      return res;
    }
  );
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('blog-content-page-页面留存时间', {
        duration
      });
    };
  }, []);
  return (
    <Loading loading={loading} className="font-next-book text-[16px]">
      <BlogHeader blog={blog} />
      <BlogContent blog={blog} />
      <BlogFooter />
      <PageRetentionTime trackName="blog-content-page-页面留存时间"></PageRetentionTime>
    </Loading>
  );
};

export default BlogDetail;
