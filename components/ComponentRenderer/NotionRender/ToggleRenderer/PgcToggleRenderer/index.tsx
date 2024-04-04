import { FC, useEffect, useState } from 'react';

import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { NotionComponent, CustomComponent } from '@/components/ComponentRenderer/type';
import { ComponentRenderer, useGlobalRendererContext } from '@/components/ComponentRenderer';
import TextRenderer from '@/components/ComponentRenderer/NotionRender/TextRenderer';
import { PgcExpandDataType } from '@/components/ComponentRenderer/context';

interface PgcToggleRendererProps {
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: NotionComponent | CustomComponent;
}

const PgcToggleRenderer: FC<PgcToggleRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;
  const [showChild, setShowChild] = useState(true);
  const { expandData: contextExpandData, updateExpandData } = useGlobalRendererContext();
  const expandData = contextExpandData as PgcExpandDataType[];
  const changeShowChild = (status: boolean) => {
    if (!expandData) {
      setShowChild(status);
      return;
    }
    const newExpandData = [...expandData] as PgcExpandDataType[];
    const index = newExpandData?.findIndex((v) => v.id === component.id);
    newExpandData[index].expandNum = status ? 1 : 0;
    setShowChild(status);
    updateExpandData?.(newExpandData, expandData[0].index);
  };

  useEffect(() => {
    const expandNum = expandData?.find((v) => v.id === component.id)?.expandNum || 0;
    if (expandNum === 1) {
      setShowChild(true);
    } else {
      setShowChild(false);
    }
  }, [expandData, component]);

  return (
    <div className="overflow-hidden border-b  border-[#676767]">
      <div
        className="my-3 flex cursor-pointer items-center justify-between px-[.5rem]"
        onClick={() => changeShowChild(!showChild)}
      >
        <div>
          <TextRenderer richTextArr={component.content.rich_text} fontSize={'16px'} className="body-m" />
        </div>
        <span className={``}>
          {!showChild ? <VscAdd size={20}></VscAdd> : <VscChromeMinimize size={20}></VscChromeMinimize>}
        </span>
      </div>
      {/* 正常渲染子对象 */}
      <div className="pl-4">
        {isRenderChildren &&
          showChild &&
          component.children?.map((item: any, index: number) => {
            return <ComponentRenderer key={index} component={item} parent={component}></ComponentRenderer>;
          })}
      </div>
    </div>
  );
};

export default PgcToggleRenderer;
