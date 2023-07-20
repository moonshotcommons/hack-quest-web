import { FC, ReactNode } from 'react';
import TextRenderer from '../TextRenderer';

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
    </div>
  );
};

export default QuoteRenderer;
