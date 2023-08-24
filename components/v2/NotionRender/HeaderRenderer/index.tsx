import { FC, useContext, useMemo, useState } from 'react';
import { cn } from '@/helper/utils';
import TextRenderer from '../TextRenderer';
import { NotionRenderType } from '../type';
import { NotionComponent, NotionType } from '../../LessonPage/type';
import ComponentRenderer from '../../LessonPage/ComponentRenderer';
import { LessonContentContext } from '../../LessonPage/LessonContent';
import { ExpandDataType } from '@/hooks/useLessonExpand';

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

  const { expandData, changeExpandData } = useContext(LessonContentContext);
  const HeadingTag = ('h' + type.slice(-1)) as keyof JSX.IntrinsicElements;
  const className = cn(
    `font-bold`,
    type === NotionType.H1 ? 'text-[1.5rem]' : '',
    type === NotionType.H2 ? 'text-[1.25rem]' : '',
    type === NotionType.H3 ? 'text-[1rem]' : ''
  );

  const expandIndex = useMemo(() => {
    return expandData.findIndex((v) => v.id === component.id);
  }, [component]);

  const changeExpandNum = () => {
    const newExpandData = [...expandData] as ExpandDataType[];
    for (let i = expandIndex + 1; i < newExpandData.length; i++) {
      if (newExpandData[i].expandNum !== undefined) {
        newExpandData[i].expandNum =
          (newExpandData?.[i].expandNum as number) + 1;
      } else if (newExpandData[i].isExpandAll) break;
    }
    changeExpandData(newExpandData, newExpandData[0].index);
  };

  return (
    <div className="py-[10px] pr-[4px]">
      <HeadingTag className={`${className} flex justify-between items-center`}>
        <TextRenderer richTextArr={component.content.rich_text} fontSize={21} />
        {expandIndex >= 0 && (
          <span
            className="cursor-pointer text-[12px] underline"
            onClick={changeExpandNum}
          >
            Expand All
          </span>
        )}
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
