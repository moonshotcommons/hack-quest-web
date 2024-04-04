import { FC } from 'react';
import TextRenderer from '../TextRenderer';
import { NotionComponent } from '../type';
import { CustomComponent } from '../../type';
import { childRenderCallback } from '../..';

interface ParagraphRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const ParagraphRenderer: FC<ParagraphRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;

  return (
    <div className="pt-[5px]">
      <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
      <div className="ml-4">{component.children?.map(childRenderCallback(component))}</div>
    </div>
  );
};

export default ParagraphRenderer;
