import { FC, ReactNode, useContext } from 'react';
import { HeaderLevel } from './type';
import { cn } from '@/helper/utils';
import NotionRenderer, { NotionRendererContext, Renderer } from '..';
import { LessonStyleType } from '@/service/webApi/course/type';
import TextRenderer from '../TextRenderer';

interface HeaderRendererProps {
  type: HeaderLevel;
  source: any;
  isRenderChildren?: boolean;
}

const HeaderRenderer: FC<HeaderRendererProps> = (props) => {
  const { type, source, isRenderChildren = true } = props;
  const HeadingTag = ('h' + type.slice(-1)) as keyof JSX.IntrinsicElements;
  const { styleType } = useContext(NotionRendererContext);
  const className = cn(
    ``,
    type === HeaderLevel.H1 ? '' : '',
    type === HeaderLevel.H2 ? '' : '',
    type === HeaderLevel.H3 ? '' : '',
    type === HeaderLevel.H4 ? '' : '',
    type === HeaderLevel.H5 ? '' : '',
    type === HeaderLevel.H6 ? '' : ''
  );

  return (
    <div>
      <HeadingTag>
        <TextRenderer richTextArr={source[type].rich_text} />{' '}
      </HeadingTag>
      {/* 正常渲染子对象 */}
      <div>
        {isRenderChildren &&
          source.children.map((item: any, index: number) => {
            return (
              <Renderer
                key={index}
                type={item.type}
                source={item[item.type]}
              ></Renderer>
            );
          })}
      </div>
    </div>
  );
};

export default HeaderRenderer;
