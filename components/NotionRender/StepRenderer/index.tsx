import { FC, ReactNode } from 'react';
import TextRenderer from '../TextRenderer';

interface StepRendererProps {
  type: string;
  source: any;
}

const StepRenderer: FC<StepRendererProps> = (props) => {
  const { source } = props;
  const type = source.type;
  return (
    <div className="w-full relative mb-[1.25rem] mt-[.625rem]">
      <div className="absolute top-0 left-[1.5rem] -translate-y-[50%] px-[.5rem] pt-[.1875rem] pb-[.3125rem] bg-[#111] rounded-[.25rem] text-[#9EFA13] text-[.75rem] font-next-book leading-[110%]">
        step
      </div>
      <div className="w-full py-5 px-6 rounded-[1.25rem] bg-[#1E1E1E]">
        <TextRenderer richTextArr={source[type].rich_text}></TextRenderer>
      </div>
    </div>
  );
};

export default StepRenderer;
