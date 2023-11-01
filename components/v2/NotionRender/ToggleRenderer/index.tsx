import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { cn } from '@/helper/utils';
import { LessonStyleType } from '@/service/webApi/course/type';
import TextRenderer from '../TextRenderer';
import DropDownIcon from '@/components/Common/Icon/DropDown';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { CustomComponent, NotionComponent } from '../../LessonPage/type';
import ComponentRenderer from '../../LessonPage/ComponentRenderer';
import { LessonContentContext } from '../../LessonPage/LessonContent';
import { ExpandDataType } from '@/hooks/useLessonExpand';
interface ToggleRendererProps {
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: NotionComponent | CustomComponent;
}

const ToggleRenderer: FC<ToggleRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;
  const [showChild, setShowChild] = useState(true);
  const { expandData, changeExpandData } = useContext(LessonContentContext);
  console.info(expandData, component);
  const changeShowChild = (status: boolean) => {
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
