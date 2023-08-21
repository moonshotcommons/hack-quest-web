import { FC } from 'react';
import { cn } from '@/helper/utils';
import TextRenderer from '../TextRenderer';
import { NotionRenderType } from '../type';
import { NotionComponent, NotionType } from '../../LessonPage/type';
import ComponentRenderer from '../../LessonPage/ComponentRenderer';

type HeaderLevel =
  | NotionRenderType.H1
  | NotionRenderType.H2
  | NotionRenderType.H3;
interface HeaderRendererProps {
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const HeaderRenderer: FC<HeaderRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;

  const type = component.type;

  const HeadingTag = ('h' + type.slice(-1)) as keyof JSX.IntrinsicElements;
  const className = cn(
    `font-bold`,
    type === NotionType.H1 ? 'text-[1.5rem]' : '',
    type === NotionType.H2 ? 'text-[1.25rem]' : '',
    type === NotionType.H3 ? 'text-[1rem]' : ''
  );

  return (
    <div className="py-4">
      <HeadingTag className={className}>
        <TextRenderer richTextArr={component.content.rich_text} />{' '}
      </HeadingTag>
      {/* 正常渲染子对象 */}
      <div className="ml-4">
        {isRenderChildren &&
          component.children?.map((item: any, index: number) => {
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

export default HeaderRenderer;
