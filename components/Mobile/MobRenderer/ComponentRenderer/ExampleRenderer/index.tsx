import Button from '@/components/Common/Button';
import { ExampleComponent } from '@/components/Web/Business/Renderer/type';
import { cn } from '@/helper/utils';
import LzString from 'lz-string';
import Link from 'next/link';
import { FC, createContext, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import ComponentRenderer from '..';
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

  useEffect(() => {
    if (component) {
      const activeIndex = component.codeFiles?.findIndex((file) => {
        return file.isActive;
      });
      if (activeIndex !== -1) setActiveFileIndex(activeIndex);
    }
  }, [component]);

  return (
    <div
      className={`rounded-[.5rem] py-[12px] px-[1.25rem] bg-neutral-light-gray w-full`}
    >
      <div
        className="flex justify-between items-center"
        onClick={() => setExpand(!expand)}
      >
        <span className="inline-flex font-next-book-bold items-center relative text-[18px] tracking-[1.08px]">
          {component.title || 'Example'}
        </span>
        <span>
          <FiChevronDown
            size={28}
            color=""
            className={`${
              expand ? 'rotate-180' : '0'
            } transition-transform cursor-pointer`}
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
            {component.children.map((child) => {
              return (
                <ComponentRenderer
                  key={child.id}
                  component={child}
                  parent={component}
                ></ComponentRenderer>
              );
            })}
          </ExampleContext.Provider>
          {!!component.codeFiles?.length && (
            <div className="flex flex-col h-full">
              <div className="w-full flex gap-[5px]">
                {component.codeFiles?.map((codeFile, index) => {
                  return (
                    <div
                      key={`${codeFile.filename}-${index}`}
                      className={cn(
                        'py-[3px] px-[10px]  rounded-t-[10px] cursor-pointer',
                        index === activeFileIndex
                          ? 'bg-[#fafafa]'
                          : 'bg-[#ececec]'
                      )}
                      onClick={() => setActiveFileIndex(index)}
                    >
                      {codeFile.filename}
                    </div>
                  );
                })}
              </div>
              <div className="relative flex flex-col bg-[#fafafa] mb-[20px] rounded-[10px] rounded-tl-[0px]">
                <ExampleContext.Provider
                  value={{
                    updateExampleContent: (value: string) =>
                      setExampleContent(value),
                    isExample: true
                  }}
                >
                  <ComponentRenderer
                    key={component.codeFiles[activeFileIndex].codeContent.id}
                    component={component.codeFiles[activeFileIndex].codeContent}
                    parent={component}
                  ></ComponentRenderer>
                </ExampleContext.Provider>
              </div>
            </div>
          )}
        </div>
      )}

      {expand && component.renderIdeBtn && (
        <Link
          href={`${
            component.ideUrl ||
            process.env.IDE_URL ||
            'https://ide.dev.hackquest.io'
          }?code=${encodeURIComponent(
            LzString.compressToBase64(exampleContent)
          )}`}
          target="_blank"
          className="self-end"
        >
          <Button
            ghost
            className="text-neutral-black font-next-book text-[14px] leading-[125%] tracking-[0.28px] border py-[8px] px-[40px] border-neutral-black  hover:bg-neutral-white/50 transition"
          >
            Try It Out
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ExampleRenderer;
