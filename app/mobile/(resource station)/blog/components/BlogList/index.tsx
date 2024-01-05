import BlogCard from '@/components/v2/Business/BlogCard';
import { BlogType } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface BlogListProp {
  list: BlogType[];
}

const BlogList: React.FC<BlogListProp> = ({ list }) => {
  return (
    <div className="flex flex-wrap gap-x-[20px] gap-y-[40px]">
      {list.map((blog) => (
        <div className="w-[calc((100%-40px)/3)]" key={blog.id}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
