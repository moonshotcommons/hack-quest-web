'use client';
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
  const { component, parent } = props;
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
    <div className={`flex h-fit w-full flex-col rounded-[.625rem] bg-[#E6E6E6] px-[20px] py-[12px] ${expand ? 'min-h-[50%] flex-1' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-h4 relative inline-flex items-center">{component.title || 'Example'}</span>
        <span onClick={() => setExpand(!expand)}>
          <FiChevronDown
            size={28}
            color=""
            className={`${expand ? 'rotate-180' : '0'} cursor-pointer transition-transform`}
          ></FiChevronDown>
        </span>
      </div>
      {expand && (
        <div className="relative mt-[20px] flex flex-1 flex-col overflow-hidden">
          <ExampleContext.Provider
            value={{
              updateExampleContent: (value: string) => setExampleContent(value),
              isExample: true
            }}
          >
            {component.children.map((child) => {
              return <ComponentRenderer key={child.id} component={child} parent={component}></ComponentRenderer>;
            })}
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
              <div className="relative mb-[20px] flex flex-1 flex-col overflow-y-auto rounded-[10px] rounded-tl-[0px] bg-[#fafafa]">
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
                  ></ComponentRenderer>
                </ExampleContext.Provider>
              </div>
            </div>
          )}
        </div>
      )}

      {expand && component.renderIdeBtn && (
        <Link
          href={`${process.env.IDE_URL || 'https://ide.dev.hackquest.io'}?code=${encodeURIComponent(
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
      )}
    </div>
  );
};

export default ExampleRenderer;
