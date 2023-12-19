import { FC, useContext } from 'react';
import { NotionRendererContext, Renderer } from '..';
import TextRenderer from '../TextRenderer';
import { CustomRenderType, NotionRenderType } from '../type';

interface ParagraphRendererProps {
  type: NotionRenderType | CustomRenderType;
  source: any;
  isRenderChildren?: boolean;
  parent: any;
}

const ParagraphRenderer: FC<ParagraphRendererProps> = (props) => {
  const { type, source, isRenderChildren = true } = props;
  const { styleType } = useContext(NotionRendererContext);

  return (
    <div className="py-2">
      <TextRenderer richTextArr={source[type].rich_text}></TextRenderer>
      <div className="ml-4">
        {source.children?.map((item: any, index: number) => {
          return (
            <Renderer
              key={index}
              type={item.type}
              source={item}
              parent={source}
            ></Renderer>
          );
        })}
      </div>
    </div>
  );
};

export default ParagraphRenderer;
