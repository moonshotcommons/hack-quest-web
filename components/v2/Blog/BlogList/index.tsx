import React from 'react';

interface BlogListProp {}

const BlogList: React.FC<BlogListProp> = () => {
  return (
    <div className="mt-[80px] flex flex-wrap gap-x-[20px] gap-y-[40px]">
      {Array.from({ length: 10 }).map((_, i) => (
        <div className="w-[calc((100%-40px)/3)]" key={i}>
          {/* <BlogCard /> */}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
