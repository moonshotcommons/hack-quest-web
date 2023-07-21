import { FC, ReactNode, useContext } from 'react';
import { cn } from '@/helper/utils';
import NotionRenderer, { NotionRendererContext, Renderer } from '..';
import { LessonStyleType } from '@/service/webApi/course/type';
import TextRenderer from '../TextRenderer';
import { NotionRenderType } from '../type';

type HeaderLevel =
  | NotionRenderType.H1
  | NotionRenderType.H2
  | NotionRenderType.H3;
interface HeaderRendererProps {
  type: HeaderLevel;
  source: any;
  isRenderChildren?: boolean;
  parent: any;
}

const HeaderRenderer: FC<HeaderRendererProps> = (props) => {
  const { type, source, isRenderChildren = true } = props;
  const HeadingTag = ('h' + type.slice(-1)) as keyof JSX.IntrinsicElements;
  const { styleType } = useContext(NotionRendererContext);
  const className = cn(
    ``,
    type === NotionRenderType.H1 ? '' : '',
    type === NotionRenderType.H2 ? '' : '',
    type === NotionRenderType.H3 ? '' : ''
  );

  return (
    <div>
      <HeadingTag className="mb-[1.25rem]">
        <TextRenderer richTextArr={source[type].rich_text} />{' '}
      </HeadingTag>
      {/* 正常渲染子对象 */}
      <div>
        {isRenderChildren &&
          source.children?.map((item: any, index: number) => {
            return (
              <Renderer
                key={index}
                type={item.type}
                source={item[item.type]}
                parent={source}
              ></Renderer>
            );
          })}
      </div>
    </div>
  );
};

export default HeaderRenderer;
