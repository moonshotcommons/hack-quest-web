import { FC, ReactNode } from 'react';
import TextRenderer from '../TextRenderer';
import { Renderer } from '..';

interface QuoteRendererProps {
  source: any;
  type: string;
  parent: any;
}

const QuoteRenderer: FC<QuoteRendererProps> = (props) => {
  const { source, type } = props;
  return (
    <div className="pl-[1.5rem] border-l-2 border-solid border-[#676767] text-[#676767] text-[.875rem] leading-[128%] font-next-book mb-[1.25rem]">
      {<TextRenderer richTextArr={source[type].rich_text}></TextRenderer>}
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

export default QuoteRenderer;
