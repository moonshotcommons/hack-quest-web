import { FC, ReactNode, useContext } from 'react';
import { cn } from '@/helper/utils';
import NotionRenderer, { NotionRendererContext, Renderer } from '..';
import { LessonStyleType } from '@/service/webApi/course/type';
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
    </div>
  );
};

export default ParagraphRenderer;
