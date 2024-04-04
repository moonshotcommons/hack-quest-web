import { FC, useMemo } from 'react';
import { NotionComponent, NotionComponentType } from '../type';
import { childRenderCallback } from '../..';
import TextRenderer from '../TextRenderer';
import { CustomComponent } from '../../type';

interface NumberListItemRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  component: NotionComponent | CustomComponent;
  parent: any;
}

const NumberListItemRenderer: FC<NumberListItemRendererProps> = (props) => {
  const { component, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;

  const index = useMemo(() => {
    const currentIndex = children.findIndex((child: any) => child.id === component.id);

    let firstIndex = 0;

    for (let i = currentIndex; i >= 0; i--) {
      if (children[i].type !== NotionComponentType.NUMBERED_LIST_ITEM) {
        break;
      }
      firstIndex = i;
    }
    return currentIndex - firstIndex;
  }, [children, component]);

  return (
    <div>
      <div className="">
        <span className="body-s inline-flex h-full w-fit items-center py-[0.4rem]">{index + 1}.</span>

        <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
      </div>
      <div className="ml-4">{component.children?.map(childRenderCallback(component))}</div>
    </div>
  );
};

export default NumberListItemRenderer;
