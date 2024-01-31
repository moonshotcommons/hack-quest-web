import { FC } from 'react';
import TextRenderer from '../TextRenderer';

import ComponentRenderer from '../../';
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
    <div className="body-l mb-[36px] border-l-[3px] border-solid border-neutral-rich-gray pl-[20px] text-renderer-quote-text-color">
      {
        <TextRenderer
          richTextArr={component.content.rich_text}
          fontFamily="font-neuemachina"
          fontSize="16px"
        ></TextRenderer>
      }
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
