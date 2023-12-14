import { FC, useContext } from 'react';
import { cn } from '@/helper/utils';
import { NotionRendererContext, Renderer } from '..';
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
    `font-bold`,
    type === NotionRenderType.H1 ? 'text-[1.5rem]' : '',
    type === NotionRenderType.H2 ? 'text-[1.25rem]' : '',
    type === NotionRenderType.H3 ? 'text-[1rem]' : ''
  );

  return (
    <div className="py-4">
      <HeadingTag className={className}>
        <TextRenderer richTextArr={source[type].rich_text} />{' '}
      </HeadingTag>
      {/* 正常渲染子对象 */}
      <div className="ml-4">
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

export default HeaderRenderer;
