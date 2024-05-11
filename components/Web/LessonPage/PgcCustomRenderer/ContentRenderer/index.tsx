import { LessonPageContext } from '@/components/Web/LessonPage/type';
import { BurialPoint } from '@/helper/burialPoint';
import { FC, useContext, useState } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import { PlaygroundContext } from '@/components/Web/LessonPage/Playground/type';
import { OverrideRendererConfig, childRenderCallback } from '@/components/ComponentRenderer';
import { CustomComponent } from '@/components/ComponentRenderer/type';
import TextRenderer from '@/components/ComponentRenderer/NotionRender/TextRenderer';

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
    <OverrideRendererConfig codeRenderer={{ isPlayground: false }}>
      <div
        className={`mb-5 rounded-[10px] px-[20px]  py-[15px] ${
          leftLength > 1 ? 'border border-lesson-title-box-border-color' : ''
        } ${isPlayground ? 'flex flex-1 flex-col' : ''}`}
      >
        <div
          className={`flex items-center justify-between ${leftLength > 1 ? 'cursor-pointer' : ''}`}
          onClick={() => {
            if (leftLength <= 1) return;
            BurialPoint.track('lesson-content展开');
            setShowAll(!showAll);
          }}
        >
          <span className="text-h4">
            {component.title && component.title.toLowerCase() !== 'content' ? (
              component.title
            ) : (
              <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
            )}
          </span>
          {leftLength > 1 ? (
            <span className={`${showAll ? 'rotate-180' : 'rotate-0'} transition-transform duration-150 ease-in-out`}>
              <VscChevronDown size={24} />
            </span>
          ) : null}
        </div>
        {showAll && <div className="mt-4">{component?.children?.map(childRenderCallback(component))}</div>}
      </div>
    </OverrideRendererConfig>
  );
};

export default ContentRenderer;
