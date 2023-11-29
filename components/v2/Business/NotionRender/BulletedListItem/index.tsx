import { FC } from 'react';
import ComponentRenderer from '@/components/v2/Business/ComponentRenderer';
import TextRenderer from '../TextRenderer';

interface BulletedListItemRendererProps {
  component: any;
  parent: any;
}

const BulletedListItemRenderer: FC<BulletedListItemRendererProps> = (props) => {
  const { component, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;

  // const index = children
  //   ?.filter((child: any) => child.type === NotionRenderType.BULLETED_LIST_ITEM)
  //   .findIndex((child: any) => child.id === source.id);
  return (
    <div>
      <div className="flex items-start gap-2 py-1">
        <span className="leading-[200%]">•</span>
        <div>
          <TextRenderer
            richTextArr={component.content.rich_text}
          ></TextRenderer>
        </div>
      </div>
      <div className="ml-4">
        {component.children?.map((child: any, index: number) => {
          return (
            <ComponentRenderer
              key={index}
              component={child}
              parent={component}
            ></ComponentRenderer>
          );
        })}
      </div>
    </div>
  );
};

export default BulletedListItemRenderer;
