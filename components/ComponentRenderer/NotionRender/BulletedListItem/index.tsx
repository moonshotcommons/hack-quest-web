import { FC } from 'react';
import TextRenderer from '../TextRenderer';
import { childRenderCallback } from '../..';
import { NotionComponent } from '../type';
import { CustomComponent } from '../../type';

interface BulletedListItemRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const BulletedListItemRenderer: FC<BulletedListItemRendererProps> = (props) => {
  const { component, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;

  // const index = children
  //   ?.filter((child: any) => child.type === NotionComponentType.BULLETED_LIST_ITEM)
  //   .findIndex((child: any) => child.id === source.id);
  return (
    <div>
      <div className="flex items-start gap-2 py-1">
        <span className="leading-[200%]">•</span>
        <div>
          <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
        </div>
      </div>
      <div className="ml-4">{component.children?.map(childRenderCallback(component))}</div>
    </div>
  );
};

export default BulletedListItemRenderer;
