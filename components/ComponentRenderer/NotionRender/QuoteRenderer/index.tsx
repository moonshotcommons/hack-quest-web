import { FC } from 'react';
import TextRenderer from '../TextRenderer';
import { NotionComponent } from '../type';
import { CustomComponent } from '../../type';
import { ComponentRenderer } from '../..';

interface QuoteRendererProps {
  component: NotionComponent;
  parent: NotionComponent | CustomComponent;
}

const QuoteRenderer: FC<QuoteRendererProps> = (props) => {
  const { component } = props;
  return (
    <div className="body-s mb-[1.25rem] border-l-2 border-solid border-renderer-quote-border-color pl-[1.5rem] text-renderer-quote-text-color">
      {<TextRenderer richTextArr={component.content.rich_text}></TextRenderer>}
      {component.children?.map((item: any, index: number) => {
        return <ComponentRenderer key={index} component={item} parent={component}></ComponentRenderer>;
      })}
    </div>
  );
};

export default QuoteRenderer;
