import { FC } from 'react';
import TextRenderer from '../TextRenderer';

import ComponentRenderer from '../../';
import {
  CustomComponent,
  NotionComponent
} from '@/components/v2/Business/Renderer/type';

interface QuoteRendererProps {
  component: NotionComponent;
  parent: NotionComponent | CustomComponent;
}

const QuoteRenderer: FC<QuoteRendererProps> = (props) => {
  const { component } = props;
  return (
    <div className="pl-[20px] border-l-[3px] border-solid border-[#3E3E3E] text-renderer-quote-text-color text-[16px] leading-[160%]  mb-[36px]">
      {
        <TextRenderer
          richTextArr={component.content.rich_text}
          fontStyle="font-neuemachina"
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
