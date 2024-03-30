'use client';
import React, { useMemo } from 'react';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import { CustomComponent } from '@/components/Web/Business/Renderer/type';
import ComponentRender from '../ComponentRender';
import { RendererContext } from '@/components/Web/Business/Renderer/context';

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
      <RendererContext.Provider
        value={{
          textRenderer: {
            fontSize: '14px'
          }
        }}
      >
        {blog?.content?.map((component: CustomComponent) => (
          <ComponentRender key={component.id} component={component} parent={parent} />
        ))}
      </RendererContext.Provider>
    </div>
  );
};

export default BlogContent;
