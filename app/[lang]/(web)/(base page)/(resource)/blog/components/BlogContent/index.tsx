'use client';
import React, { useMemo } from 'react';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import { CustomComponent } from '@/components/Web/Business/Renderer/type';
import ComponentRender from '../ComponentRender';

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
    <div className="mx-auto w-[808px] py-[80px]">
      {blog?.content?.map((component: CustomComponent) => (
        <ComponentRender key={component.id} component={component} parent={parent} />
      ))}
    </div>
  );
};

export default BlogContent;
