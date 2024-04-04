'use client';
import React, { useMemo } from 'react';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';

import { ComponentRendererProvider, ComponentRenderer } from '@/components/ComponentRenderer';
import { CustomComponent, PageType } from '@/components/ComponentRenderer/type';
import BlogCustomRenderer from '../BlogCustomRenderer.tsx';

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
      <ComponentRendererProvider type={PageType.BLOG} CustomComponentRenderer={BlogCustomRenderer}>
        {blog?.content?.map((component: CustomComponent, index: number) => {
          const prevComponent = index === 0 ? null : blog.content[index - 1];
          const nextComponent = index === blog.content.length - 1 ? null : blog.content[index + 1];
          return (
            <ComponentRenderer
              key={component.id}
              component={component}
              parent={parent}
              position={index}
              prevComponent={prevComponent}
              nextComponent={nextComponent}
            />
          );
        })}
      </ComponentRendererProvider>
    </div>
  );
};

export default BlogContent;
