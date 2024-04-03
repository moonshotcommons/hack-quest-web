import { FC, useMemo } from 'react';

import ComponentRenderer from '../../';
import TextRenderer from '../TextRenderer';
import { NotionRenderType } from '@/components/Web/Business/NotionRender/type';

interface NumberListItemRendererProps {
  component: any;
  parent: any;
}

const NumberListItemRenderer: FC<NumberListItemRendererProps> = (props) => {
  const { component, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;
  // const index = children
  //   ?.filter((child: any) => child.type === NotionRenderType.NUMBERED_LIST_ITEM)
  //   .findIndex((child: any) => child.id === source.id);

  const index = useMemo(() => {
    const currentIndex = children.findIndex((child: any) => child.id === component.id);

    let firstIndex = 0;

    for (let i = currentIndex; i >= 0; i--) {
      if (children[i].type !== NotionRenderType.NUMBERED_LIST_ITEM) {
        break;
      }
      firstIndex = i;
    }
    return currentIndex - firstIndex;
  }, [children, component]);

  return (
    <div>
      <div className="">
        <span className="body-l inline-flex h-full w-fit items-center py-[0.4rem] pr-[4px] text-neutral-black">
          {index + 1}.
        </span>

        <TextRenderer richTextArr={component.content.rich_text} fontStyle="text-neutral-black"></TextRenderer>
      </div>
      <div className="ml-4">
        {component.children?.map((child: any, index: number) => {
          return <ComponentRenderer key={index} component={child} parent={component}></ComponentRenderer>;
        })}
      </div>
    </div>
  );
};

export default NumberListItemRenderer;
