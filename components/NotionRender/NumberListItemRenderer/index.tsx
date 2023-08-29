import { FC, useMemo } from 'react';
import { Renderer } from '..';
import TextRenderer from '../TextRenderer';
import { CustomRenderType, NotionRenderType } from '../type';

interface NumberListItemRendererProps {
  type: NotionRenderType | CustomRenderType;
  source: any;
  parent: any;
}

const NumberListItemRenderer: FC<NumberListItemRendererProps> = (props) => {
  const { source, type, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;
  // const index = children
  //   ?.filter((child: any) => child.type === NotionRenderType.NUMBERED_LIST_ITEM)
  //   .findIndex((child: any) => child.id === source.id);

  const index = useMemo(() => {
    const currentIndex = children.findIndex(
      (child: any) => child.id === source.id
    );

    let firstIndex = 0;

    for (let i = currentIndex; i >= 0; i--) {
      if (children[i].type !== NotionRenderType.NUMBERED_LIST_ITEM) {
        break;
      }
      firstIndex = i;
    }
    return currentIndex - firstIndex;
  }, [children, source]);

  return (
    <div>
      <div className="flex gap-2 py-1">
        <span className="">{index + 1}.</span>
        <TextRenderer richTextArr={source[type].rich_text}></TextRenderer>
      </div>
      <div className="ml-4">
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
    </div>
  );
};

export default NumberListItemRenderer;
