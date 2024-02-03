import BlogCard from '@/components/Web/Business/BlogCard';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface BlogListProp {
  list: BlogType[];
  from?: ResourceFrom;
}

const BlogList: React.FC<BlogListProp> = ({
  list,
  from = ResourceFrom.BLOG
}) => {
  return (
    <div className="flex flex-wrap gap-x-[20px] gap-y-[40px]">
      {list.map((blog) => (
        <div className="w-[calc((100%-40px)/3)]" key={blog.id}>
          <BlogCard blog={blog} from={from} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
