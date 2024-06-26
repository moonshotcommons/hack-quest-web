import { BurialPoint } from '@/helper/burialPoint';
import { FC, useContext, useState } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import TextRenderer from '@/components/ComponentRenderer/NotionRender/TextRenderer';
import { CustomComponent } from '@/components/ComponentRenderer/type';
import { LessonPageContext } from '../../type';
import { PlaygroundContext } from '../../Playground/type';
import { childRenderCallback } from '@/components/ComponentRenderer';
interface ContentRendererProps {
  component: CustomComponent;
  parent: CustomComponent;
}

const ContentRenderer: FC<ContentRendererProps> = (props) => {
  const { component } = props;
  const [showAll, setShowAll] = useState(true);
  const { leftLength } = useContext(LessonPageContext);
  const { isPlayground } = useContext(PlaygroundContext);
  return (
    <div
      className={`mb-5 rounded-[10px] px-[20px]  py-[15px] ${
        leftLength > 1 ? 'border border-lesson-title-box-border-color' : ''
      } ${isPlayground ? 'flex flex-1 flex-col' : ''}`}
    >
      <div
        className={`flex  items-center justify-between ${leftLength > 1 ? 'cursor-pointer' : ''}`}
        onClick={() => {
          if (leftLength <= 1) return;
          BurialPoint.track('lesson-content展开');
          setShowAll(!showAll);
        }}
      >
        <span className="text-h4 mb-[10px]">
          {component.title || <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>}
        </span>
        {leftLength > 1 ? (
          <span className={`${showAll ? 'rotate-180' : 'rotate-0'} transition-transform duration-150 ease-in-out`}>
            <VscChevronDown size={24} />
          </span>
        ) : null}
      </div>
      {showAll && component?.children?.map(childRenderCallback(component))}
    </div>
  );
};

export default ContentRenderer;
