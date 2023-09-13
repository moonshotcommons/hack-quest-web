import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { cn } from '@/helper/utils';
import { LessonStyleType } from '@/service/webApi/course/type';
import TextRenderer from '../TextRenderer';
import DropDownIcon from '@/components/Common/Icon/DropDown';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { CustomComponent, NotionComponent } from '../../LessonPage/type';
import ComponentRenderer from '../../LessonPage/ComponentRenderer';
import { LessonContentContext } from '../../LessonPage/LessonContent';
interface ToggleRendererProps {
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: NotionComponent | CustomComponent;
}

const ToggleRenderer: FC<ToggleRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;
  const [showChild, setShowChild] = useState(false);
  const { expandData } = useContext(LessonContentContext);
  const [initExpandNum, setInitExpandNum] = useState(0);
  useEffect(() => {
    const expandNum =
      expandData?.find((v) => v.id === component.id)?.expandNum || 0;
    if (expandNum > initExpandNum) {
      setShowChild(true);
      setInitExpandNum(expandNum);
    }
  }, [expandData]);
  return (
    <div className="border-b border-[#676767]">
      <div
        className="px-[.5rem] flex justify-between items-center my-3"
        onClick={() => setShowChild(!showChild)}
      >
        <div>
          <TextRenderer
            richTextArr={component.content.rich_text}
            fontSize={'16px'}
          />
        </div>
        <span className={`cursor-pointer`}>
          {!showChild ? (
            <VscAdd size={20}></VscAdd>
          ) : (
            <VscChromeMinimize size={20}></VscChromeMinimize>
          )}
        </span>
      </div>
      {/* 正常渲染子对象 */}
      <div className="ml-4">
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
