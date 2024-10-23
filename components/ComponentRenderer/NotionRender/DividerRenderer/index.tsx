'use client';

import { FC, useState } from 'react';
import { NotionComponent } from '../type';
import { useGlobalRendererContext } from '../..';
import { CustomComponent, PageType } from '../../type';
import { cn } from '@/helper/utils';
import { HEADING_TYPES } from '../HeaderRenderer';

interface DividerRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const DividerRenderer: FC<DividerRendererProps> = (props) => {
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
        return `body-s my-[4px]`;
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
        return 'body-l my-[6px]';
    }
  };

  if (!visible) return null;

  return (
    <div
      datatype={component.type}
      className={cn(
        'body-s rounded-[5px] py-[4px] text-renderer-quote-text-color',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
    >
      <hr className="border-neutral-light-gray" />
    </div>
  );
};

export default DividerRenderer;
