import ComponentRenderer from '../../';
import { cn } from '@/helper/utils';
import { ExpandDataType } from '@/hooks/useLessonExpand';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

import {
  NotionComponent,
  NotionType
} from '@/components/v2/Business/Renderer/type';
import { LessonContentContext } from '@/components/v2/LessonPage/LessonContent';
import TextRenderer from '../TextRenderer';
import { NotionRenderType } from '@/components/v2/Business/NotionRender/type';

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
  const [isExpandAll, setIsExpandAll] = useState(false);
  const className = cn(
    `font-bold`,
    type === NotionType.H1 ? 'text-[1.5rem]' : '',
    type === NotionType.H2 ? 'text-[1.25rem]' : '',
    type === NotionType.H3 ? 'text-[1rem]' : ''
  );

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
    <div className="pb-[10px] pt-[20px] pr-[4px]">
      <HeadingTag
        className={`${className} flex justify-between items-center font-next-poster-Thin tracking-[1.26px]`}
      >
        <div>
          <TextRenderer
            richTextArr={component.content.rich_text}
            fontSize={'21px'}
            letterSpacing={'1.68px'}
          />
        </div>
        {expandIndex >= 0 && (
          <span
            className="cursor-pointer text-[12px] underline font-next-book"
            onClick={changeExpandNum}
          >
            {isExpandAll ? 'Fold All' : 'Expand All'}
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
