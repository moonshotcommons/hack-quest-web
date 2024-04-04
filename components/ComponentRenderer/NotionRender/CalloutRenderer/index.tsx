'use client';

import { FC, useState } from 'react';
import TextRenderer from '../TextRenderer';
import { NotionComponent } from '../type';
import { childRenderCallback } from '../..';
import { CustomComponent } from '../../type';

interface CalloutRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const CalloutRenderer: FC<CalloutRendererProps> = (props) => {
  const { component, parent } = props;

  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="body-s mb-[1.25rem] rounded-[5px] border border-solid border-[#FF624D] bg-[#FFF7F5] p-[15px] text-renderer-quote-text-color">
      <div className="flex items-center justify-between gap-[15px]">
        <div className="text-[20px]">{component.content.icon?.emoji}</div>
        <div className="flex-1">
          <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
          {component.children?.map(childRenderCallback(component))}
        </div>
        {/* <div
          onClick={() => {
            setVisible(false);
          }}
          className="cursor-pointer"
        >
          <IoCloseOutline size={20}></IoCloseOutline>
        </div> */}
      </div>
    </div>
  );
};

export default CalloutRenderer;
