import { FC, ReactNode, useState } from 'react';
import TextRenderer from '../TextRenderer';
import { Renderer } from '..';
import { IoCloseOutline } from 'react-icons/io5';

interface CalloutRendererProps {
  source: any;
  type: string;
  parent: any;
}

const CalloutRenderer: FC<CalloutRendererProps> = (props) => {
  const { source, type } = props;

  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="p-[15px] border border-solid rounded-[5px] border-renderer-quote-text-color text-renderer-quote-text-color text-[.875rem] leading-[128%] font-next-book mb-[1.25rem]">
      <div className="flex gap-[15px] justify-between items-center">
        <div className="text-[20px]">{source[type].icon?.emoji}</div>
        <div className="flex-1">
          <TextRenderer richTextArr={source[type].rich_text}></TextRenderer>
        </div>
        <div
          onClick={() => {
            setVisible(false);
          }}
          className="cursor-pointer"
        >
          <IoCloseOutline size={20}></IoCloseOutline>
        </div>
      </div>
      {source.children?.map((item: any, index: number) => {
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
  );
};

export default CalloutRenderer;
