'use client';

import { FC } from 'react';
import { NotionComponent } from '../type';
import { useGlobalRendererContext } from '../..';
import { CustomComponent, PageType } from '../../type';
import { cn } from '@/helper/utils';
import { HEADING_TYPES } from '../HeaderRenderer';
import { useQuery } from '@tanstack/react-query';
import LoadingIcon from '@/components/Common/LoadingIcon';
import Image from 'next/image';
import Link from 'next/link';

interface BookmarkMetadata {
  url: string;
  title: string;
  description: string;
  favicon: string;
}

interface CalloutRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const BookmarkRenderer: FC<CalloutRendererProps> = (props) => {
  const { component, parent, nextComponent, prevComponent } = props;

  const { pageType, isMobile } = useGlobalRendererContext();

  const { data, isLoading } = useQuery<BookmarkMetadata>({
    queryKey: ['bookmark', component.content.url],
    queryFn: async () => {
      const res = await fetch(`/api/helper/fetch-metadata?url=${component.content.url}`);
      return res.json();
    }
  });

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
        return `body-s my-[14px]`;
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
        return 'body-l my-[18px]';
    }
  };

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-2">
        <LoadingIcon></LoadingIcon>
      </div>
    );

  return (
    <Link href={data?.url || ''} target="_blank">
      <div
        datatype={component.type}
        className={cn(
          'body-s flex flex-col gap-4 rounded-[5px] border border-solid border-neutral-light-gray bg-white p-[15px] text-renderer-quote-text-color',
          isMobile ? getMobileClassName() : getWebClassName(),
          nextComponent === null ? 'mb-0' : '',
          prevComponent === null ? 'mt-0' : ''
        )}
      >
        <div className="flex flex-col gap-px">
          <div className="body-s-bold">{data?.title || ''}</div>
          <div className="body-xs text-neutral-medium-gray">{data?.description || ''}</div>
        </div>
        <div className="flex gap-2">
          {data?.favicon && <Image src={data?.favicon || ''} alt="favicon" width={16} height={16}></Image>}
          <span className="body-xs">{data?.url || ''}</span>
        </div>
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
    </Link>
  );
};

export default BookmarkRenderer;
