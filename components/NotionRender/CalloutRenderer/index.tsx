import { FC, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Renderer } from '..';
import TextRenderer from '../TextRenderer';

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
    <div className="p-[15px] bg-[#FFF7F5] border border-solid rounded-[5px] border-[#FF624D] text-renderer-quote-text-color text-[.875rem] leading-[128%] font-next-book mb-[1.25rem]">
      <div className="flex gap-[15px] justify-between items-center">
        <div className="text-[20px]">{source[type].icon?.emoji}</div>
        <div className="flex-1">
          <TextRenderer richTextArr={source[type].rich_text}></TextRenderer>
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
        <div
          onClick={() => {
            setVisible(false);
          }}
          className="cursor-pointer"
        >
          <IoCloseOutline size={20}></IoCloseOutline>
        </div>
      </div>
    </div>
  );
};

export default CalloutRenderer;
