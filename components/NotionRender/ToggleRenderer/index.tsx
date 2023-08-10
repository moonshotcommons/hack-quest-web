import { FC, ReactNode, useContext, useState } from 'react';

import { cn } from '@/helper/utils';
import NotionRenderer, { NotionRendererContext, Renderer } from '..';
import { LessonStyleType } from '@/service/webApi/course/type';
import TextRenderer from '../TextRenderer';
import DropDownIcon from '@/components/Common/Icon/DropDown';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
interface ToggleRendererProps {
  type: string;
  source: any;
  isRenderChildren?: boolean;
  parent: any;
}

const ToggleRenderer: FC<ToggleRendererProps> = (props) => {
  const { type, source, isRenderChildren = true } = props;

  const [showChild, setShowChild] = useState(false);

  return (
    <div>
      <div
        className="w-fit py-[.25rem] px-[.75rem] flex justify-center items-center border border-[#676767] rounded-[2.5rem] my-4 gap-3"
        onClick={() => setShowChild(!showChild)}
      >
        <TextRenderer richTextArr={source[type].rich_text} />{' '}
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
          source.children?.map((item: any, index: number) => {
            return (
              <Renderer
                key={index}
                type={item.type}
                source={item}
                parent={source}
              ></Renderer>
            );
          })}
      </div>
    </div>
  );
};

export default ToggleRenderer;
