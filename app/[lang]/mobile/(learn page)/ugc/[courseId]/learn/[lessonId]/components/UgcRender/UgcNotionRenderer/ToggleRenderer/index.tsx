import { FC, useContext, useEffect, useMemo } from 'react';

import ComponentRenderer from '@/components/Web/Business/Renderer/ComponentRenderer';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';

import { NotionComponent } from '@/components/Web/Business/Renderer/type';
import TextRenderer from '../TextRenderer';
import { cn } from '@/helper/utils';
import { NotionRenderType } from '@/components/Web/Business/NotionRender/type';
import { UgcContext } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
interface ToggleRendererProps {
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const ToggleRenderer: FC<ToggleRendererProps> = (props) => {
  const { component, isRenderChildren = true, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;
  const { expandData, updateExpandData } = useContext(UgcContext);

  const { group, firstIndex, lastIndex, currentIndex } = useMemo(() => {
    const currentIndex: number = children.findIndex((child: any) => child.id === component.id);

    let firstIndex = 0;
    let lastIndex = 0;
    let group = [];

    for (let i = currentIndex; i >= 0; i--) {
      if (children[i].type !== NotionRenderType.TOGGLE) {
        break;
      }
      firstIndex = i;
    }

    for (let j = firstIndex; j < children.length; j++) {
      if (children[j].type !== NotionRenderType.TOGGLE) {
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

  return (
    <div>
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
          <div>
            <TextRenderer richTextArr={component.content.rich_text} fontSize={'16px'} />
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
            component.children?.map((item: any, index: number) => {
              return <ComponentRenderer key={index} component={item} parent={component}></ComponentRenderer>;
            })}
        </div>
      </div>
    </div>
  );
};

export default ToggleRenderer;
