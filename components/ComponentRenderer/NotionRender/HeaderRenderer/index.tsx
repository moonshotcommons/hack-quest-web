import { cn } from '@/helper/utils';
import { FC, useEffect, useMemo, useState } from 'react';
import TextRenderer from '../TextRenderer';
import { NotionComponent, NotionComponentType } from '../type';
import { childRenderCallback, useGlobalRendererContext, useCodeRendererContext } from '../..';
import { PgcExpandDataType } from '../../context';
import { CustomComponent, PageType } from '../../type';

export const HEADING_TYPES = [
  NotionComponentType.H1,
  NotionComponentType.H2,
  NotionComponentType.H3,
  NotionComponentType.H4,
  NotionComponentType.H5,
  NotionComponentType.H6
] as const;

interface HeaderRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const HeaderRenderer: FC<HeaderRendererProps> = (props) => {
  const { component, isRenderChildren = true, nextComponent, prevComponent } = props;
  const type = component.type;

  const {
    expandData: contextExpandData,
    updateExpandData,
    pageType,
    isMobile,
    expandDataRight: contextExpandDataRight,
    updateExpandDataRight
  } = useGlobalRendererContext();
  const { isPlayground } = useCodeRendererContext();
  const expandData = isPlayground
    ? (contextExpandDataRight as PgcExpandDataType[])
    : (contextExpandData as PgcExpandDataType[]);
  const HeadingTag = ('h' + type.slice(-1)) as keyof JSX.IntrinsicElements;
  const [isExpandAll, setIsExpandAll] = useState(false);

  const expandIndex = useMemo(() => {
    return expandData?.findIndex((v) => v.id === component.id);
  }, [component]);

  const changeExpandNum = () => {
    const setExpandData = isPlayground ? updateExpandDataRight : updateExpandData;
    const newIsExpandAll = !isExpandAll;
    const newExpandData = [...expandData] as PgcExpandDataType[];
    for (let i = expandIndex + 1; i < newExpandData.length; i++) {
      if (newExpandData[i].expandNum !== undefined) {
        newExpandData[i].expandNum = newIsExpandAll ? 1 : 0;
      } else if (newExpandData[i].isExpandAll) break;
    }
    setIsExpandAll(newIsExpandAll);
    setExpandData?.(newExpandData, newExpandData[0].index);
  };

  const changeExpandAll = () => {
    if (!expandData) {
      setIsExpandAll(false);
      return;
    }
    let newIsExpandAll = false;
    for (let i = expandIndex + 1; i < expandData.length; i++) {
      if (expandData[i].expandNum === 1) {
        newIsExpandAll = true;
        break;
      } else if (expandData[i].isExpandAll) break;
    }
    setIsExpandAll(newIsExpandAll);
  };

  useEffect(() => {
    changeExpandAll();
  }, [expandData]);

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'mb-[5px]',
          type === NotionComponentType.H1 ? 'text-h1-mob' : '',
          type === NotionComponentType.H2 ? 'text-h2-mob' : '',
          type === NotionComponentType.H3 ? 'text-h3-mob' : '',
          type === NotionComponentType.H4 ? 'text-h4-mob' : '',
          type === NotionComponentType.H4 ? 'text-h5-mob' : ''
        );
      case PageType.UGC:
        return cn(
          'mb-[5px]',
          type === NotionComponentType.H1 ? 'text-h1-mob' : '',
          type === NotionComponentType.H2 ? 'text-h2-mob' : '',
          type === NotionComponentType.H3 ? 'text-h3-mob' : '',
          type === NotionComponentType.H4 ? 'text-h4-mob' : '',
          type === NotionComponentType.H4 ? 'text-h5-mob' : ''
        );
      case PageType.MINI:
        return cn(
          'mb-[5px]',
          type === NotionComponentType.H1 ? 'text-h1-mob' : '',
          type === NotionComponentType.H2 ? 'text-h2-mob' : '',
          type === NotionComponentType.H3 ? 'text-h3-mob' : '',
          type === NotionComponentType.H4 ? 'text-h4-mob' : '',
          type === NotionComponentType.H4 ? 'text-h5-mob' : ''
        );
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return cn(
          'my-[14px]',
          type === NotionComponentType.H1 ? 'text-h2-mob' : '',
          type === NotionComponentType.H2 ? 'text-h3-mob' : '',
          type === NotionComponentType.H3 ? 'text-h4-mob' : '',
          type === NotionComponentType.H4 ? 'text-h5-mob' : ''
        );
    }
  };

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'mb-2',
          type === NotionComponentType.H1 ? 'text-h2' : '',
          type === NotionComponentType.H2 ? 'text-h3' : '',
          type === NotionComponentType.H3 ? 'text-h4' : '',
          type === NotionComponentType.H4 ? 'text-h5' : ''
        );
      case PageType.UGC:
        return cn(
          'mb-2',
          type === NotionComponentType.H1 ? 'text-h2' : '',
          type === NotionComponentType.H2 ? 'text-h3' : '',
          type === NotionComponentType.H3 ? 'text-h4' : '',
          type === NotionComponentType.H4 ? 'text-h5' : ''
        );
      case PageType.MINI:
        return cn(
          'mb-2',
          type === NotionComponentType.H1 ? 'text-h2' : '',
          type === NotionComponentType.H2 ? 'text-h3' : '',
          type === NotionComponentType.H3 ? 'text-h4' : '',
          type === NotionComponentType.H4 ? 'text-h5' : ''
        );
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return cn(
          'my-[18px]',
          type === NotionComponentType.H1 ? 'text-h2' : '',
          type === NotionComponentType.H2 ? 'text-h3' : '',
          type === NotionComponentType.H3 ? 'text-h4' : '',
          type === NotionComponentType.H4 ? 'text-h5' : ''
        );
    }
  };

  const showLeftBorder = (isMobile && pageType === PageType.PGC) || pageType === PageType.UGC;

  return (
    <div
      className={cn(
        PageType.PGC === pageType ? 'mt-[30px]' : '',
        PageType.UGC === pageType ? 'mt-[50px]' : '',
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
      datatype={component.type}
    >
      <HeadingTag className={cn(`flex items-center justify-between`)}>
        <div
          className={cn(
            'inline-block h-auto w-full text-neutral-black',
            isMobile ? getMobileClassName() : getWebClassName(),
            nextComponent === null ? 'mb-0' : '',
            prevComponent === null ? 'mt-0' : ''
          )}
        >
          {showLeftBorder && (
            <span className={cn('h-full w-[5px] rounded-full bg-yellow-primary', isMobile ? 'mr-[5px]' : 'mr-[10px]')}>
              &nbsp;
            </span>
          )}
          <span>
            <TextRenderer richTextArr={component.content.rich_text} />
          </span>
        </div>
        {expandIndex >= 0 && (
          <span className="underline-s cursor-pointer whitespace-nowrap" onClick={changeExpandNum}>
            {isExpandAll ? 'Fold All' : 'Expand All'}
          </span>
        )}
      </HeadingTag>

      {/* 正常渲染子对象 */}
      {isRenderChildren && !!component.children?.length && (
        <div className="my-2 ml-5">{isRenderChildren && component.children?.map(childRenderCallback(component))}</div>
      )}
    </div>
  );
};

export default HeaderRenderer;
