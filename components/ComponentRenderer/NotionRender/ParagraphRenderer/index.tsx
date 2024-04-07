import { FC } from 'react';
import TextRenderer from '../TextRenderer';
import { NotionComponent } from '../type';
import { CustomComponent, PageType } from '../../type';
import { childRenderCallback, useGlobalRendererContext } from '../..';
import { cn } from '@/helper/utils';
import { HEADING_TYPES } from '../HeaderRenderer';

interface ParagraphRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const ParagraphRenderer: FC<ParagraphRendererProps> = (props) => {
  const { component, isRenderChildren = true, nextComponent, prevComponent } = props;

  const { pageType, isMobile } = useGlobalRendererContext();

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn('my-[5px] body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.UGC:
        return <div className=""></div>;
      case PageType.MINI:
        return <div className=""></div>;
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
        return <div className=""></div>;
      case PageType.MINI:
        return <div className=""></div>;
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return 'body-l my-[18px]';
    }
  };

  return (
    <p
      className={cn(
        'inline-block w-full text-neutral-black',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
      datatype={component.type}
    >
      <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
      <div className="ml-4">{component.children?.map(childRenderCallback(component))}</div>
    </p>
  );
};

export default ParagraphRenderer;
