import { FC, useContext, useEffect, useState } from 'react';

import ComponentRenderer from '@/components/v2/Business/Renderer/ComponentRenderer';
import { ExpandDataType } from '@/hooks/useLessonExpand';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';

import {
  CustomComponent,
  NotionComponent
} from '@/components/v2/Business/Renderer/type';
import { LessonContentContext } from '@/components/v2/LessonPage/LessonContent';
import TextRenderer from '../TextRenderer';
interface ToggleRendererProps {
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: NotionComponent | CustomComponent;
}

const ToggleRenderer: FC<ToggleRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;
  const [showChild, setShowChild] = useState(true);
  const { expandData, changeExpandData } = useContext(LessonContentContext);
  const changeShowChild = (status: boolean) => {
    if (!expandData) {
      setShowChild(status);
      return;
    }
    const newExpandData = [...expandData] as ExpandDataType[];
    const index = newExpandData?.findIndex((v) => v.id === component.id);
    newExpandData[index].expandNum = status ? 1 : 0;
    setShowChild(status);
    changeExpandData(newExpandData, expandData[0].index);
  };
  useEffect(() => {
    const expandNum =
      expandData?.find((v) => v.id === component.id)?.expandNum || 0;
    if (expandNum === 1) {
      setShowChild(true);
    } else {
      setShowChild(false);
    }
  }, [expandData, component]);
  return (
    <div className="border-b border-[#676767]  overflow-hidden">
      <div
        className="px-[.5rem] flex justify-between items-center my-3 cursor-pointer"
        onClick={() => changeShowChild(!showChild)}
      >
        <div>
          <TextRenderer
            richTextArr={component.content.rich_text}
            fontSize={'16px'}
          />
        </div>
        <span className={``}>
          {!showChild ? (
            <VscAdd size={20}></VscAdd>
          ) : (
            <VscChromeMinimize size={20}></VscChromeMinimize>
          )}
        </span>
      </div>
      {/* 正常渲染子对象 */}
      <div className="pl-4">
        {isRenderChildren &&
          showChild &&
          component.children?.map((item: any, index: number) => {
            return (
              <ComponentRenderer
                key={index}
                component={item}
                parent={component}
              ></ComponentRenderer>
            );
          })}
      </div>
    </div>
  );
};

export default ToggleRenderer;
