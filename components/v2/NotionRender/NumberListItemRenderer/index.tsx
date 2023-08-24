import { FC, ReactNode } from 'react';
import TextRenderer from '../TextRenderer';
import { NotionComponent, NotionType } from '../../LessonPage/type';
import ComponentRenderer from '../../LessonPage/ComponentRenderer';

interface NumberListItemRendererProps {
  component: NotionComponent;
  parent: any;
}

const NumberListItemRenderer: FC<NumberListItemRendererProps> = (props) => {
  const { component, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;
  const index = children
    ?.filter((child: any) => child.type === NotionType.NUMBERED_LIST_ITEM)
    .findIndex((child: any) => child.id === component.id);
  return (
    <li className="list-decimal">
      <div className="flex items-center gap-2 py-1">
        {/* <span className="">{index + 1}.</span> */}
        <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
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
    </li>
  );
};

export default NumberListItemRenderer;
