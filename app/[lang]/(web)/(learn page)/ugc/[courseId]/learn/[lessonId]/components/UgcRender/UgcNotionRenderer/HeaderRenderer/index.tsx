import ComponentRenderer from '@/components/Web/Business/Renderer/ComponentRenderer';
import { ExpandDataType } from '@/hooks/courses/useLessonExpand';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

import { NotionComponent, NotionType } from '@/components/Web/Business/Renderer/type';
import { LessonContentContext } from '@/components/Web/LessonPage/LessonContent';
import TextRenderer from '../TextRenderer';
import { NotionRenderType } from '@/components/Web/Business/NotionRender/type';

type HeaderLevel = NotionRenderType.H1 | NotionRenderType.H2 | NotionRenderType.H3;
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
  const [isExpandAll, setIsExpandAll] = useState(false);

  const expandIndex = useMemo(() => {
    return expandData?.findIndex((v) => v.id === component.id);
  }, [component]);

  const changeExpandNum = () => {
    const newIsExpandAll = !isExpandAll;
    const newExpandData = [...expandData] as ExpandDataType[];
    for (let i = expandIndex + 1; i < newExpandData.length; i++) {
      if (newExpandData[i].expandNum !== undefined) {
        newExpandData[i].expandNum = newIsExpandAll ? 1 : 0;
      } else if (newExpandData[i].isExpandAll) break;
    }
    setIsExpandAll(newIsExpandAll);
    changeExpandData(newExpandData, newExpandData[0].index);
  };
  const changeExpandAll = () => {
    if (!expandData) {
      setIsExpandAll(false);
      return;
    }
    let newIsExpandAll = false;
    for (let i = expandIndex + 1; i < expandData.length; i++) {
      if (expandData[i].expandNum === 1) {
        newIsExpandAll = true;
        break;
      } else if (expandData[i].isExpandAll) break;
    }
    setIsExpandAll(newIsExpandAll);
  };
  useEffect(() => {
    changeExpandAll();
  }, [expandData]);

  return (
    <div className="mb-5 mt-[50px] pr-[4px]" data-type={component.type}>
      <HeadingTag className={`flex items-center justify-between`}>
        <div className="flex items-center gap-[10px]">
          <div className="h-[2.125rem] w-[5px] rounded-full bg-yellow-dark"></div>
          <TextRenderer richTextArr={component.content.rich_text} type={type as NotionType} />
        </div>
        {expandIndex >= 0 && (
          <span className="underline-m cursor-pointer" onClick={changeExpandNum}>
            {isExpandAll ? 'Fold All' : 'Expand All'}
          </span>
        )}
      </HeadingTag>
      {/* 正常渲染子对象 */}
      <div className="ml-4">
        {isRenderChildren &&
          component.children?.map((item: any, index: number) => {
            return <ComponentRenderer key={index} component={item} parent={component}></ComponentRenderer>;
          })}
      </div>
    </div>
  );
};

export default HeaderRenderer;