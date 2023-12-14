import { FC } from 'react';
import TextRenderer from '../TextRenderer';
import { Renderer } from '..';
import { NotionRenderType } from '../type';

interface StepRendererProps {
  type: string;
  source: any;
  parent: any;
}

const StepRenderer: FC<StepRendererProps> = (props) => {
  const { source, parent } = props;
  const type = source.type;
  let children = parent?.isRoot ? parent.content : parent.children;
  const index = children
    ?.filter((child: any) => child.type === NotionRenderType.NUMBERED_LIST_ITEM)
    .findIndex((child: any) => child.id === source.id);

  return (
    <div className="w-full relative mt-[.625rem]">
      <div className="absolute top-0 left-[1.5rem] -translate-y-[50%] px-[.5rem] pt-[.1875rem] pb-[.3125rem] bg-renderer-step-label-bg rounded-[.25rem] text-renderer-step-label-text-color text-[.75rem] font-next-book leading-[110%]">
        Step {index + 1}
      </div>
      <div className="w-full py-5 px-6 rounded-[1.25rem] bg-renderer-step-box-bg  text-renderer-step-box-text-color mb-[1.25rem] flex items-center">
        <TextRenderer richTextArr={source[type].rich_text}></TextRenderer>
      </div>
      {source.children?.map((child: any, index: number) => {
        return (
          <Renderer
            key={index}
            type={child.type}
            source={child}
            parent={source}
          ></Renderer>
        );
      })}
    </div>
  );
};

export default StepRenderer;
