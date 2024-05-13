import { FC, useMemo } from 'react';
import { NotionComponent, NotionComponentType } from '../type';
import { childRenderCallback, useGlobalRendererContext } from '../..';
import TextRenderer from '../TextRenderer';
import { CustomComponent, PageType } from '../../type';
import { cn } from '@/helper/utils';
import { HEADING_TYPES } from '../HeaderRenderer';

interface NumberListItemRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  component: NotionComponent | CustomComponent;
  parent: any;
}

const NumberListItemRenderer: FC<NumberListItemRendererProps> = (props) => {
  const { component, parent, nextComponent, prevComponent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;
  const { pageType, isMobile } = useGlobalRendererContext();

  const index = useMemo(() => {
    const currentIndex = children?.findIndex((child: any) => child.id === component.id);
    let firstIndex = 0;
    for (let i = currentIndex; i >= 0; i--) {
      if (children[i].type !== NotionComponentType.NUMBERED_LIST_ITEM) {
        break;
      }
      firstIndex = i;
    }
    return currentIndex - firstIndex;
  }, [children, component]);

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'body-s',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mt-[5px]' : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mb-[5px]' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.UGC:
        return cn(
          'body-m',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mt-[5px]' : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mb-[5px]' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.MINI:
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return cn(
          `body-s`,
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mt-[14px]' : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mb-[14px]' : ''
        );
    }
  };

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'body-s',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mt-2' : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mb-2' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.UGC:
        return cn(
          'body-l',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mt-2' : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mb-2' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.DOCUMENTATION:
        return cn(
          'body-xs',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mt-1' : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mb-1' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.DOCUMENTATION_FULL:
        return cn(
          'body-s',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mt-1' : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mb-1' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.MINI:
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return cn(
          `body-l`,
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mt-[18px]' : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM ? 'mb-[18px]' : ''
        );
    }
  };

  return (
    <div
      datatype={component.type}
      className={cn(
        'inline-block w-full text-neutral-black',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
    >
      <div className={cn('flex', pageType !== PageType.UGC ? 'items-center' : '')}>
        <span className="inline-flex h-full w-fit pr-2">{index + 1}.</span>
        <span>
          <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
        </span>
      </div>
      <div className="my-2 ml-5">{component.children?.map(childRenderCallback(component))}</div>
    </div>
  );
};

export default NumberListItemRenderer;
