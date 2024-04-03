import MobBlogCard from '@/components/Mobile/MobBlogCard';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface BlogListProp {
  list: BlogType[];
  from?: ResourceFrom;
}

const BlogList: React.FC<BlogListProp> = ({ list, from = ResourceFrom.BLOG }) => {
  return (
    <div className="flex flex-col gap-y-[1rem]">
      {list.map((blog) => (
        <div className="w-full" key={blog.id}>
          <MobBlogCard blog={blog} from={from} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
