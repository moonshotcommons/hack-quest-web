import { FC, ReactNode, useState } from 'react';
import TextRenderer from '../TextRenderer';
import { IoCloseOutline } from 'react-icons/io5';
import ComponentRenderer from '../../LessonPage/ComponentRenderer';
import { NotionComponent } from '../../LessonPage/type';

interface CalloutRendererProps {
  component: NotionComponent;
  parent: any;
}

const CalloutRenderer: FC<CalloutRendererProps> = (props) => {
  const { component, parent } = props;

  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="p-[15px] border border-solid rounded-[5px] border-renderer-quote-text-color text-renderer-quote-text-color text-[.875rem] leading-[128%] font-next-book mb-[1.25rem]">
      <div className="flex gap-[15px] justify-between items-center">
        <div className="text-[20px]">{component.content.icon?.emoji}</div>
        <div className="flex-1">
          <TextRenderer
            richTextArr={component.content.rich_text}
          ></TextRenderer>
        </div>
        <div
          onClick={() => {
            setVisible(false);
          }}
          className="cursor-pointer"
        >
          <IoCloseOutline size={20}></IoCloseOutline>
        </div>
      </div>
      {component.children?.map((item: any, index: number) => {
        return (
          <ComponentRenderer
            key={index}
            component={item}
            parent={component}
          ></ComponentRenderer>
        );
      })}
    </div>
  );
};

export default CalloutRenderer;
