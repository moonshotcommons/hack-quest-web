import { FC } from 'react';
import TextRenderer from '../TextRenderer';

import ComponentRenderer from '@/components/Web/Business/Renderer/ComponentRenderer';
import {
  CustomComponent,
  NotionComponent
} from '@/components/Web/Business/Renderer/type';

interface QuoteRendererProps {
  component: NotionComponent;
  parent: NotionComponent | CustomComponent;
}

const QuoteRenderer: FC<QuoteRendererProps> = (props) => {
  const { component } = props;
  return (
    <div
      className="mb-[1.25rem] border-l-2 border-solid border-renderer-quote-border-color pl-[1.5rem] font-next-book text-[.875rem] leading-[128%] text-renderer-quote-text-color"
      data-type={component.type}
    >
      {<TextRenderer richTextArr={component.content.rich_text}></TextRenderer>}
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

export default QuoteRenderer;
