import { cn } from '@/helper/utils';
import { FC, useEffect, useMemo, useState } from 'react';
import TextRenderer from '../TextRenderer';
import { NotionComponent, NotionComponentType } from '../type';
import { childRenderCallback, useGlobalRendererContext } from '../..';
import { PgcExpandDataType } from '../../context';
import { CustomComponent } from '../../type';

type HeaderLevel = NotionComponentType.H1 | NotionComponentType.H2 | NotionComponentType.H3;
interface HeaderRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const HeaderRenderer: FC<HeaderRendererProps> = (props) => {
  const { component, isRenderChildren = true } = props;
  const type = component.type;

  const { expandData: contextExpandData, updateExpandData } = useGlobalRendererContext();
  const expandData = contextExpandData as PgcExpandDataType[];
  const HeadingTag = ('h' + type.slice(-1)) as keyof JSX.IntrinsicElements;
  const [isExpandAll, setIsExpandAll] = useState(false);
  const className = cn(
    `font-bold`,
    type === NotionComponentType.H1 ? 'text-[1.5rem]' : '',
    type === NotionComponentType.H2 ? 'text-[1.25rem]' : '',
    type === NotionComponentType.H3 ? 'text-[1rem]' : ''
  );

  const expandIndex = useMemo(() => {
    return expandData?.findIndex((v) => v.id === component.id);
  }, [component]);

  const changeExpandNum = () => {
    const newIsExpandAll = !isExpandAll;
    const newExpandData = [...expandData] as PgcExpandDataType[];
    for (let i = expandIndex + 1; i < newExpandData.length; i++) {
      if (newExpandData[i].expandNum !== undefined) {
        newExpandData[i].expandNum = newIsExpandAll ? 1 : 0;
      } else if (newExpandData[i].isExpandAll) break;
    }
    setIsExpandAll(newIsExpandAll);
    updateExpandData?.(newExpandData, newExpandData[0].index);
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
    <div className="pb-[10px] pr-[4px] pt-[20px]">
      <HeadingTag className={`${className} flex items-center justify-between`}>
        <div>
          <TextRenderer richTextArr={component.content.rich_text} fontSize={'18px'} className="text-h4" />
        </div>
        {expandIndex >= 0 && (
          <span className="underline-s cursor-pointer" onClick={changeExpandNum}>
            {isExpandAll ? 'Fold All' : 'Expand All'}
          </span>
        )}
      </HeadingTag>
      {/* 正常渲染子对象 */}
      <div className="ml-4">{isRenderChildren && component.children?.map(childRenderCallback(component))}</div>
    </div>
  );
};

export default HeaderRenderer;
