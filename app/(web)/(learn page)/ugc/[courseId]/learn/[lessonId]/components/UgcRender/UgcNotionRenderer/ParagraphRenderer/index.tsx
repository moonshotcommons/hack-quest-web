import ComponentRenderer from '@/components/Web/Business/Renderer/ComponentRenderer';
import { NotionComponent } from '@/components/Web/Business/Renderer/type';
import { FC } from 'react';
import TextRenderer from '../TextRenderer';

interface ParagraphRendererProps {
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const ParagraphRenderer: FC<ParagraphRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;

  return (
    <div className="pb-[15px]" data-type={component.type}>
      <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
      <div className="ml-4">
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
    </div>
  );
};

export default ParagraphRenderer;
