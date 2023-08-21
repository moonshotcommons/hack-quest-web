import { FC, ReactNode, useContext, useState } from 'react';

import { cn } from '@/helper/utils';
import { LessonStyleType } from '@/service/webApi/course/type';
import TextRenderer from '../TextRenderer';
import DropDownIcon from '@/components/Common/Icon/DropDown';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { CustomComponent, NotionComponent } from '../../LessonPage/type';
import ComponentRenderer from '../../LessonPage/ComponentRenderer';
interface ToggleRendererProps {
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: NotionComponent | CustomComponent;
}

const ToggleRenderer: FC<ToggleRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;

  const [showChild, setShowChild] = useState(false);

  return (
    <div>
      <div
        className="w-fit py-[.25rem] px-[.75rem] flex justify-center items-center border border-[#676767] rounded-[2.5rem] my-4 gap-3"
        onClick={() => setShowChild(!showChild)}
      >
        <TextRenderer richTextArr={component.content.rich_text} />{' '}
        <span
          className={`${
            !showChild ? 'rotate-0' : 'rotate-180'
          } transition-transform duration-150 ease-in-out`}
        >
          <MdKeyboardArrowDown size={24}></MdKeyboardArrowDown>
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
