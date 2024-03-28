'use client';
import ComponentRenderer from '../../';
import { NotionComponent } from '@/components/Web/Business/Renderer/type';
import { FC, useState } from 'react';
import TextRenderer from '../TextRenderer';

interface CalloutRendererProps {
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
          {component.children?.map((item: any, index: number) => {
            return <ComponentRenderer key={index} component={item} parent={component}></ComponentRenderer>;
          })}
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
