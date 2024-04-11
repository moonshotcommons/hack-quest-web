import { FC } from 'react';
import { NotionComponent } from '../type';
import { CustomComponent, PageType } from '../../type';
import { useGlobalRendererContext } from '../..';
import { cn } from '@/helper/utils';
import { HEADING_TYPES } from '../HeaderRenderer';

interface VideoRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const VideoRenderer: FC<VideoRendererProps> = (props) => {
  const { component, nextComponent, prevComponent } = props;
  const { pageType, isMobile } = useGlobalRendererContext();

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn('my-[5px] body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.UGC:
        return cn('my-[5px] body-m', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.MINI:
        return cn('my-[5px] body-m', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return `body-s mt-[14px] -mb-1`;
    }
  };

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn('my-2 body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.UGC:
        return cn('mt-2 mb-1 body-l', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.MINI:
        return cn('mt-2 mb-1 body-l', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return 'body-l mt-[18px] mb-1';
    }
  };

  return (
    <div
      datatype={component.type}
      className={cn(
        'inline-block w-full',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
    >
      <video controls>
        {/* width="400px" */}
        {<source src={component.content.file.url} />}
      </video>
    </div>
  );
};

export default VideoRenderer;
