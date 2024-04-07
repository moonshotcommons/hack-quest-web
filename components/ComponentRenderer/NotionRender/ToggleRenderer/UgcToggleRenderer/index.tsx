import { FC, useContext, useEffect, useMemo } from 'react';

import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { cn } from '@/helper/utils';
import { UgcContext } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import { CustomComponent, NotionComponentType, PageType } from '@/components/ComponentRenderer/type';
import { NotionComponent } from '@/components/ComponentRenderer/type';
import { childRenderCallback, useGlobalRendererContext } from '@/components/ComponentRenderer';
import TextRenderer from '@/components/ComponentRenderer/NotionRender/TextRenderer';

interface UgcToggleRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const UgcToggleRenderer: FC<UgcToggleRendererProps> = (props) => {
  const { component, isRenderChildren = true, parent, prevComponent, nextComponent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;
  const { expandData, updateExpandData } = useContext(UgcContext);
  const { pageType, isMobile } = useGlobalRendererContext();

  const { group, firstIndex, lastIndex, currentIndex } = useMemo(() => {
    const currentIndex: number = children.findIndex((child: any) => child.id === component.id);

    let firstIndex = 0;
    let lastIndex = 0;
    let group = [];

    for (let i = currentIndex; i >= 0; i--) {
      if (children[i].type !== NotionComponentType.TOGGLE) {
        break;
      }
      firstIndex = i;
    }

    for (let j = firstIndex; j < children.length; j++) {
      if (children[j].type !== NotionComponentType.TOGGLE) {
        break;
      }
      group.push(j);
      lastIndex = j;
    }

    return {
      currentIndex,
      index: currentIndex - firstIndex,
      firstIndex,
      lastIndex,
      group
    };
  }, [children, component]);

  useEffect(() => {
    if (currentIndex === firstIndex) {
      const newExpandData = { ...expandData };
      newExpandData[component.id] = [];
      updateExpandData(newExpandData);
    }
  }, []);

  const groupExpands = useMemo(() => {
    return expandData[children[firstIndex].id] || [];
  }, [expandData, firstIndex, children]);

  const isExpandAll = useMemo(() => {
    for (let i = 0; i < group.length; i++) {
      const find = groupExpands?.find((item) => item === group[i]);
      if (!find) return false;
    }
    return true;
  }, [groupExpands, group]);

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.UGC:
        return <div className=""></div>;
      case PageType.PGC:
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
      case PageType.UGC:
        return <div className=""></div>;
      case PageType.PGC:
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
      datatype={component.type}
      className={cn(
        '',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
    >
      {lastIndex !== currentIndex && firstIndex === currentIndex && (
        <div
          className="underline-m cursor-pointer border-b border-neutral-black py-[15px] text-right text-neutral-black"
          onClick={() => {
            let newExpandData = { ...expandData };
            let expands: number[] = [];
            if (!isExpandAll) {
              group.forEach((item) => {
                if (!groupExpands.includes(item)) {
                  expands.push(item);
                }
              });
            }
            newExpandData[children[firstIndex].id] = expands;
            updateExpandData(newExpandData);
          }}
        >
          {!isExpandAll ? `Expand All` : `Fold All`}
        </div>
      )}
      <div
        className={cn(
          'overflow-hidden border-b border-[#676767]',
          groupExpands?.includes(currentIndex) ? 'pb-5' : '',
          lastIndex === currentIndex ? 'mb-5' : ''
        )}
        data-type={component.type}
      >
        <div
          className="my-[15px] flex cursor-pointer items-center justify-between px-[.5rem]"
          onClick={() => {
            let newExpandData = { ...expandData };
            let expands = groupExpands;
            if (!expands?.includes(currentIndex)) {
              expands = expands.concat(currentIndex);
            } else {
              expands = expands.filter((i) => i !== currentIndex);
            }
            newExpandData[children[firstIndex].id] = expands;

            updateExpandData(newExpandData);
          }}
        >
          <div className="text-[16px]">
            <TextRenderer richTextArr={component.content.rich_text} />
          </div>
          <span className={``}>
            {!groupExpands?.includes(currentIndex) ? (
              <VscAdd size={20}></VscAdd>
            ) : (
              <VscChromeMinimize size={20}></VscChromeMinimize>
            )}
          </span>
        </div>
        {/* 正常渲染子对象 */}
        <div className="pl-4">
          {isRenderChildren &&
            groupExpands?.includes(currentIndex) &&
            component.children?.map(childRenderCallback(component))}
        </div>
      </div>
    </div>
  );
};

export default UgcToggleRenderer;
