'use client';
import React, { useMemo } from 'react';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import BlogCustomRenderer from '../BlogCustomRenderer.tsx';
import { ComponentRenderer, ComponentRendererProvider } from '@/components/ComponentRenderer';
import { CustomComponent, PageType } from '@/components/ComponentRenderer/type';

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
    <div className="px-[1.25rem] py-[2.5rem]">
      <ComponentRendererProvider
        type={PageType.BLOG}
        CustomComponentRenderer={BlogCustomRenderer}
        textRenderer={{
          fontSize: '14px'
        }}
      >
        {blog?.content?.map((component: CustomComponent) => (
          <ComponentRenderer key={component.id} component={component} parent={parent} />
        ))}
      </ComponentRendererProvider>
    </div>
  );
};

export default BlogContent;
