import MobBlogCard from '@/components/Mobile/MobBlogCard';
import { BlogType } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface BlogListProp {
  list: BlogType[];
}

const BlogList: React.FC<BlogListProp> = ({ list }) => {
  return (
    <div className="flex flex-col gap-y-[1rem]">
      {list.map((blog) => (
        <div className="w-full" key={blog.id}>
          <MobBlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
