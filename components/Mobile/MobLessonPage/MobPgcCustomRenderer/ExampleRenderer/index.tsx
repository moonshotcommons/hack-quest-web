import { cn } from '@/helper/utils';
import { FC, createContext, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { ExampleComponent } from '@/components/ComponentRenderer/type';
import { ComponentRenderer, childRenderCallback } from '@/components/ComponentRenderer';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';
interface ExampleRendererProps {
  // children: ReactNode
  component: ExampleComponent;
  parent: any;
}

export const ExampleContext = createContext({
  updateExampleContent: (value: string) => {},
  isExample: false
});

const ExampleRenderer: FC<ExampleRendererProps> = (props) => {
  const { component } = props;
  const [expand, setExpand] = useState(true);
  const [exampleContent, setExampleContent] = useState('');
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  const { updateExampleNum } = useUpdateHelperParams();

  useEffect(() => {
    if (component) {
      const activeIndex = component.codeFiles?.findIndex((file) => {
        return file.isActive;
      });
      if (activeIndex !== -1) setActiveFileIndex(activeIndex);
    }
  }, [component]);

  useEffect(() => {
    updateExampleNum(activeFileIndex);
  }, [activeFileIndex]);

  return (
    <div className={`w-full rounded-[.5rem] bg-neutral-off-white bg-opacity-50 px-[1.25rem] py-[12px]`}>
      <div className="flex items-center justify-between" onClick={() => setExpand(!expand)}>
        <span className="text-h4 relative inline-flex items-center">{component.title || 'Example'}</span>
        <span>
          <FiChevronDown
            size={28}
            color=""
            className={`${expand ? 'rotate-180' : '0'} cursor-pointer transition-transform`}
          ></FiChevronDown>
        </span>
      </div>
      {expand && (
        <div className="relative mt-[20px]">
          <ExampleContext.Provider
            value={{
              updateExampleContent: (value: string) => setExampleContent(value),
              isExample: true
            }}
          >
            {component.children.map(childRenderCallback(component))}
          </ExampleContext.Provider>
          {!!component.codeFiles?.length && (
            <div className="flex h-full flex-col">
              <div className="flex w-full gap-[5px]">
                {component.codeFiles?.map((codeFile, index) => {
                  return (
                    <div
                      key={`${codeFile.filename}-${index}`}
                      className={cn(
                        'cursor-pointer rounded-t-[10px]  px-[10px] py-[3px]',
                        index === activeFileIndex ? 'bg-[#fafafa]' : 'bg-[#ececec]'
                      )}
                      onClick={() => setActiveFileIndex(index)}
                    >
                      {codeFile.filename}
                    </div>
                  );
                })}
              </div>
              <div className="relative mb-[20px] flex flex-col rounded-[10px] rounded-tl-[0px] bg-[#fafafa]">
                <ExampleContext.Provider
                  value={{
                    updateExampleContent: (value: string) => setExampleContent(value),
                    isExample: true
                  }}
                >
                  <ComponentRenderer
                    key={component.codeFiles[activeFileIndex].codeContent.id}
                    component={component.codeFiles[activeFileIndex].codeContent}
                    parent={component}
                    position={0}
                    prevComponent={null}
                    nextComponent={null}
                  ></ComponentRenderer>
                </ExampleContext.Provider>
              </div>
            </div>
          )}

          <p className="caption-14pt mt-5">You can try HackQuest IDE on desktop.</p>
        </div>
      )}

      {/* {expand && component.renderIdeBtn && (
        <Link
          href={`${component.ideUrl || process.env.IDE_URL || 'https://ide.dev.hackquest.io'}?code=${encodeURIComponent(
            LzString.compressToBase64(exampleContent)
          )}`}
          target="_blank"
          className="self-end"
        >
          <Button
            ghost
            className="hover:bg-neutral-white/50 body-s border border-neutral-black px-[40px] py-[8px]  text-neutral-black transition"
          >
            Try It Out
          </Button>
        </Link>
      )} */}
    </div>
  );
};

export default ExampleRenderer;
