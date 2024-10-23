'use client';

import { FC, useState } from 'react';
import { NotionComponent } from '../type';
import { childRenderCallback, useGlobalRendererContext } from '../..';
import { CustomComponent, PageType } from '../../type';
import { cn } from '@/helper/utils';
import { HEADING_TYPES } from '../HeaderRenderer';

interface ColumnListRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const ColumnListRenderer: FC<ColumnListRendererProps> = (props) => {
  const { component, parent, nextComponent, prevComponent } = props;
  const [visible, setVisible] = useState(true);

  const { pageType, isMobile } = useGlobalRendererContext();

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn('my-[5px] body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.UGC:
        return cn('my-2 body-m', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.MINI:
        return cn('my-2 body-m', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.DOCUMENTATION:
        return cn('my-1 body-xs', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.DOCUMENTATION_FULL:
        return cn('my-2 body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return `body-s py-[14px]`;
    }
  };

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn('my-2 body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.UGC:
        return cn('my-2 body-l', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.MINI:
        return cn('my-2 body-l', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.DOCUMENTATION:
        return cn('my-2 body-xs', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.DOCUMENTATION_FULL:
        return cn('my-2 body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return 'body-l py-[18px]';
    }
  };

  return (
    <div
      datatype={component.type}
      className={cn(
        'body-s  rounded-[5px] text-renderer-quote-text-color',
        isMobile ? getMobileClassName() : getWebClassName(),
        isMobile ? 'flex flex-col gap-8' : ' flex justify-between gap-8',
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
    >
      {component.children?.map((child) => {
        return (
          <div key={child.id} className={cn(!isMobile ? 'flex-1' : 'w-full')}>
            {child.children?.map(childRenderCallback(child))}
          </div>
        );
      })}

      {/* <div className="flex items-center justify-between gap-[15px]">
        <div className="text-[20px]">{component.content.icon?.emoji}</div>
        <div className="flex-1">
          <div className={cn(!!component.children?.length ? (isMobile ? 'mb-[5px]' : 'mb-2') : '')}>
            <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
          </div>
          {component.children?.map(childRenderCallback(component))}
        </div>
      </div> */}
    </div>
  );
};

export default ColumnListRenderer;
