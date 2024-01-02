'use client';
import React, { useMemo } from 'react';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import ComponentRender from '../components/ComponentRender';
import { CustomComponent } from '@/components/v2/Business/Renderer/type';

interface BlogContentProp {
  blog: BlogDetailType;
}

const BlogContent: React.FC<BlogContentProp> = ({ blog }) => {
  const parent = useMemo(() => {
    return {
      ...blog,
      isRoot: true
    };
  }, [blog]);
  return (
    <div className="py-[80px] w-[808px] mx-auto">
      {blog?.content?.map((component: CustomComponent) => (
        <ComponentRender
          key={component.id}
          component={component}
          parent={parent}
        />
      ))}
    </div>
  );
};

export default BlogContent;
