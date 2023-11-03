import {
  FC,
  createContext,
  use,
  useCallback,
  useEffect,
  useState
} from 'react';
import { FiChevronDown } from 'react-icons/fi';
import ComponentRenderer from '..';
import { CustomComponent, ExampleComponent } from '../../type';
import Button from '@/components/Common/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LzString from 'lz-string';
import { cn } from '@/helper/utils';
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
    <div
      className={`rounded-[.625rem] py-[12px] px-[20px] bg-[#E6E6E6] flex w-full flex-col h-fit ${
        expand ? 'min-h-fit flex-1' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="inline-flex font-next-poster-Bold items-center relative text-[18px] font-bold tracking-[1.08px]">
          {component.title || 'Example'}
        </span>
        <span onClick={() => setExpand(!expand)}>
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
        <div className="relative mt-[20px] flex-1 flex flex-col">
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
              <div className="relative flex-1 overflow-y-auto flex flex-col bg-[#fafafa] mb-[20px] rounded-[10px] rounded-tl-[0px]">
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
            process.env.IDE_URL || 'https://ide.dev.hackquest.io'
          }?code=${encodeURIComponent(
            LzString.compressToBase64(exampleContent)
          )}`}
          target="_blank"
          className="self-end"
        >
          <Button
            ghost
            className="text-[#0b0b0b] font-next-book text-[14px] leading-[125%] tracking-[0.28px] border py-[8px] px-[40px] border-black  hover:bg-white/50 transition"
          >
            Try It Out
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ExampleRenderer;
