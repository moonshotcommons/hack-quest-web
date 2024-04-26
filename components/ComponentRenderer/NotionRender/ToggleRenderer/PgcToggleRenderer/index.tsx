import { FC, useEffect, useState } from 'react';

import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { NotionComponent, CustomComponent, PageType, NotionComponentType } from '@/components/ComponentRenderer/type';
import { childRenderCallback, useCodeRendererContext, useGlobalRendererContext } from '@/components/ComponentRenderer';
import TextRenderer from '@/components/ComponentRenderer/NotionRender/TextRenderer';
import { PgcExpandDataType } from '@/components/ComponentRenderer/context';
import { cn } from '@/helper/utils';
import { HEADING_TYPES } from '../../HeaderRenderer';

interface PgcToggleRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: NotionComponent | CustomComponent;
}

const PgcToggleRenderer: FC<PgcToggleRendererProps> = (props) => {
  const { component, isRenderChildren = true, prevComponent, nextComponent } = props;
  const [showChild, setShowChild] = useState(true);
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
  const changeShowChild = (status: boolean) => {
    if (!expandData) {
      setShowChild(status);
      return;
    }
    const setExpandData = isPlayground ? updateExpandDataRight : updateExpandData;
    const newExpandData = [...expandData] as PgcExpandDataType[];
    const index = newExpandData?.findIndex((v) => v.id === component.id);
    newExpandData[index].expandNum = status ? 1 : 0;
    setShowChild(status);
    setExpandData?.(newExpandData, expandData[0].index);
  };

  useEffect(() => {
    const expandNum = expandData?.find((v) => v.id === component.id)?.expandNum || 0;
    if (expandNum === 1) {
      setShowChild(true);
    } else {
      setShowChild(false);
    }
  }, [expandData, component]);

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'py-[10px]',
          prevComponent?.type !== NotionComponentType.TOGGLE ? 'border-t mt-[5px]' : '',
          nextComponent?.type !== NotionComponentType.TOGGLE ? 'mb-[5px]' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.UGC:
        return <div className=""></div>;
      case PageType.GLOSSARY:
      case PageType.BLOG:
        return ``;

      case PageType.MINI:
        return <div className=""></div>;
    }
  };

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'py-3',
          prevComponent?.type !== NotionComponentType.TOGGLE ? 'border-t mt-2' : '',
          nextComponent?.type !== NotionComponentType.TOGGLE ? 'mb-2' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : ''
        );
      case PageType.UGC:
        return <div className=""></div>;
      case PageType.MINI:
        return <div className=""></div>;
      case PageType.GLOSSARY:
      case PageType.BLOG:
        return ``;
    }
  };

  return (
    <div
      className={cn(
        'inline-block w-full overflow-hidden border-b border-[#676767]',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
      datatype={component.type}
    >
      <div
        className={cn('flex cursor-pointer items-center justify-between px-[.5rem]')}
        onClick={() => changeShowChild(!showChild)}
      >
        <div className={cn(isMobile ? 'body-s' : 'body-m')}>
          <TextRenderer richTextArr={component.content.rich_text} />
        </div>
        <span className={``}>
          {!showChild ? <VscAdd size={20}></VscAdd> : <VscChromeMinimize size={20}></VscChromeMinimize>}
        </span>
      </div>
      {/* 正常渲染子对象 */}
      {isRenderChildren && showChild && !!component.children?.length && (
        <div className="ml-5 mt-3">{component.children?.map(childRenderCallback(component))}</div>
      )}
    </div>
  );
};

export default PgcToggleRenderer;
