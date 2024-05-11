import { FC } from 'react';
import TextRenderer from '../TextRenderer';
import { childRenderCallback, useGlobalRendererContext } from '../..';
import { NotionComponent, NotionComponentType } from '../type';
import { CustomComponent, PageType } from '../../type';
import { cn } from '@/helper/utils';
import { HEADING_TYPES } from '../HeaderRenderer';

interface BulletedListItemRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const BulletedListItemRenderer: FC<BulletedListItemRendererProps> = (props) => {
  const { component, parent, nextComponent, prevComponent } = props;
  const { pageType, isMobile } = useGlobalRendererContext();
  let children = parent?.isRoot ? parent.content : parent.children;

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'body-s',
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mt-[5px]' : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mb-[5px]' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.UGC:
        return cn(
          'body-m',
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mt-[5px]' : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mb-[5px]' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.MINI:
        return cn(
          'body-m',
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mt-[5px]' : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mb-[5px]' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return cn(
          `body-s`,
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mt-[14px]' : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mb-[14px]' : ''
        );
    }
  };

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'body-s',
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mt-2' : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mb-2' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.UGC:
        return cn(
          'body-l',
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mt-2' : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mb-2' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.MINI:
        return cn(
          'body-l',
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mt-2' : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mb-2' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return cn(
          `body-l`,
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mt-[18px]' : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM ? 'mb-[16px]' : ''
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
        <span className="pr-2">●</span>
        <span>
          <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
        </span>
      </div>
      <div className="my-2 ml-5">{component.children?.map(childRenderCallback(component))}</div>
    </div>
  );
};

export default BulletedListItemRenderer;
