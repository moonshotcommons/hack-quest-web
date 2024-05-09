import { FC } from 'react';
import TextRenderer from '../TextRenderer';
import { NotionComponent } from '../type';
import { CustomComponent, PageType } from '../../type';
import { childRenderCallback, useGlobalRendererContext } from '../..';
import { cn } from '@/helper/utils';

interface QuoteRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: NotionComponent | CustomComponent;
  isFullscreen?: boolean;
}

const QuoteRenderer: FC<QuoteRendererProps> = (props) => {
  const { component, nextComponent, prevComponent } = props;
  const { pageType, isMobile } = useGlobalRendererContext();

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return `border-neutral-rich-gray text-neutral-rich-gray caption-14pt pl-[5px] border-l-[5px] my-[5px]`;
      case PageType.UGC:
        return `border-neutral-rich-gray text-neutral-rich-gray caption-16pt pl-[5px] border-l-[5px] my-[5px]`;
      case PageType.MINI:
        return `border-neutral-rich-gray text-neutral-rich-gray caption-14pt pl-[5px] border-l-[5px] my-[5px]`;
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return cn('border-neutral-medium-gray pl-[10px] text-neutral-medium-gray body-s border-l-[3px] my-[14px]');
    }
  };

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return `border-neutral-rich-gray text-neutral-rich-gray caption-14pt pl-[5px] border-l-[3px] my-2`;
      case PageType.UGC:
        return `border-neutral-rich-gray text-neutral-rich-gray caption-18pt pl-[5px] border-l-[3px] my-2`;
      case PageType.MINI:
        return `border-neutral-rich-gray text-neutral-rich-gray caption-14pt pl-[5px] border-l-[3px] my-2`;
      case PageType.GLOSSARY:
      case PageType.BLOG:
        return cn(`border-neutral-medium-gray pl-[10px] text-neutral-medium-gray  body-m border-l-[5px] my-[18px]`);
    }
  };

  return (
    <>
      <div
        datatype={component.type}
        className={cn(
          '',
          isMobile ? getMobileClassName() : getWebClassName(),
          nextComponent === null ? 'mb-0' : '',
          prevComponent === null ? 'mt-0' : ''
        )}
      >
        {<TextRenderer richTextArr={component.content.rich_text}></TextRenderer>}
        {component.children?.map(childRenderCallback(component))}
      </div>
    </>
  );
};

export default QuoteRenderer;
