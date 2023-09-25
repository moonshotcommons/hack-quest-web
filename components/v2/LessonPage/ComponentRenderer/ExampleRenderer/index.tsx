import { FC, createContext, use, useCallback, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import ComponentRenderer from '..';
import { CustomComponent } from '../../type';
import Button from '@/components/Common/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
interface ExampleRendererProps {
  // children: ReactNode
  component: CustomComponent;
  parent: any;
}

export const ExampleContext = createContext({
  updateExampleContent: (value: string) => {}
});

const ExampleRenderer: FC<ExampleRendererProps> = (props) => {
  const { component, parent } = props;
  const [expand, setExpand] = useState(true);
  const [exampleContent, setExampleContent] = useState('');

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
        <div className="relative mt-[20px] h-full">
          <ExampleContext.Provider
            value={{
              updateExampleContent: (value: string) => setExampleContent(value)
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
        </div>
      )}
      <Link
        href={`http://localhost:8080?code=${btoa(exampleContent)}`}
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
    </div>
  );
};

export default ExampleRenderer;
