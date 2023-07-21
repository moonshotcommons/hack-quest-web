import { FC, ReactNode, useContext } from 'react';

import { cn } from '@/helper/utils';
import NotionRenderer, { NotionRendererContext, Renderer } from '..';
import { LessonStyleType } from '@/service/webApi/course/type';
import TextRenderer from '../TextRenderer';

interface ToggleRendererProps {
  type: string;
  source: any;
  isRenderChildren?: boolean;
  parent: any;
}

const ToggleRenderer: FC<ToggleRendererProps> = (props) => {
  const { type, source, isRenderChildren = true } = props;

  return (
    <div>
      <div>
        <TextRenderer richTextArr={source[type].rich_text} />{' '}
      </div>
      {/* 正常渲染子对象 */}
      <div>
        {isRenderChildren &&
          source.children?.map((item: any, index: number) => {
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

export default ToggleRenderer;
