'use client';
import AITriggerButton from '@/components/Web/AI/AITriggerButton';
import Button from '@/components/Common/Button';
import { ComponentRenderer, OverrideRendererConfig, childRenderCallback } from '@/components/ComponentRenderer';
import { ExampleComponent } from '@/components/ComponentRenderer/type';
import { cn } from '@/helper/utils';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';
import { HelperType } from '@/service/webApi/helper/type';
import LzString from 'lz-string';
import Link from 'next/link';
import { FC, createContext, useContext, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { PlaygroundContext } from '../../Playground/type';
import { useSearchParams } from 'next/navigation';
import { useUserStore } from '@/store/zustand/userStore';
import { errorMessage } from '@/helper/ui';
import { useQuery } from '@tanstack/react-query';

const CHAIN_IDE = 'https://chainide.com/s/';
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
  const { exampleExpand: expand, setExampleExpand: setExpand, lesson } = useContext(PlaygroundContext);
  const [exampleContent, setExampleContent] = useState('');
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const { updateExampleNum } = useUpdateHelperParams();
  const query = useSearchParams();
  const userInfo = useUserStore((state) => state.userInfo);

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

  const { data: suiVersion } = useQuery({
    queryKey: ['sui-version'],
    queryFn: () => fetch('https://prod-api.chainide.com/api/image/sui/version').then((res) => res.json())
  });

  const getIdeLink = () => {
    // id = '1d9db0f7-7d29-417d-a630-3258b7d52567'
    try {
      if (component.ideUrl?.includes(CHAIN_IDE)) {
        const files =
          component.codeFiles?.map((item) => {
            return {
              filename: item.filename,
              content: (
                item.codeContent?.content?.rich_text?.map((richText: any) => richText.plain_text).join('') || ''
              ).replaceAll(`rev = "framework/testnet"`, `rev = "${suiVersion?.data || 'framework/testnet'}"`)
            };
          }) || [];

        return `
          ${CHAIN_IDE}createHackProject?version=soljson-v0.8.12.js&open=${files[0]?.filename || 'filename.move'}&chain=sui&type=type&uniqueId=${lesson.id + '-' + (userInfo?.id || new Date().getTime())}&code=${encodeURIComponent(
            JSON.stringify(files)
          )}`;
      }
    } catch (err) {
      errorMessage(err);
    }

    return `${component.ideUrl || process.env.IDE_URL || 'https://ide.dev.hackquest.io'}?code=${encodeURIComponent(
      LzString.compressToBase64(exampleContent)
    )}`;
  };

  return (
    <div
      className={`flex h-fit w-full flex-col rounded-[.625rem] bg-neutral-white px-0 py-0 ${expand ? 'min-h-[50%] flex-1' : ''}`}
    >
      <div className="flex items-center justify-between gap-6">
        <span className="flex gap-2">
          <span className="text-h4 relative inline-flex items-center">{component.title || 'Example'}</span>
          <AITriggerButton triggerType={HelperType.ExplainExample} onlyIcon>
            Explain
          </AITriggerButton>
        </span>
        <span onClick={() => setExpand(!expand)} className="flex flex-1 justify-end">
          <FiChevronDown
            size={28}
            color=""
            className={`${expand ? 'rotate-180' : '0'} cursor-pointer transition-transform`}
          ></FiChevronDown>
        </span>
      </div>
      {expand && (
        <div className="relative mt-[20px] flex flex-1 flex-col overflow-hidden">
          <OverrideRendererConfig
            exampleRendererContext={{
              updateExampleContent: (value: string) => setExampleContent(value),
              isExample: true
            }}
          >
            {component.children.map(childRenderCallback(component))}
          </OverrideRendererConfig>
          {!!component.codeFiles?.length && (
            <div className="flex h-full flex-col">
              <div className="flex w-full gap-[5px]">
                {component.codeFiles?.map((codeFile, index) => {
                  return (
                    <div
                      key={`${codeFile.filename}-${index}`}
                      className={cn(
                        'mt-4 cursor-pointer  truncate rounded-t-[10px] px-[10px] py-[2px]',
                        index === activeFileIndex
                          ? 'border-b-2 border-neutral-light-gray bg-[#ececec] font-bold'
                          : 'bg-[#fafafa]'
                      )}
                      onClick={() => setActiveFileIndex(index)}
                    >
                      {codeFile.filename}
                    </div>
                  );
                })}
              </div>
              <div className="relative mb-[20px] flex flex-1 flex-col overflow-y-auto !rounded-[10px] rounded-tl-[0px] bg-[#fafafa]">
                <ExampleContext.Provider
                  value={{
                    updateExampleContent: (value: string) => setExampleContent(value),
                    isExample: true
                  }}
                >
                  <ComponentRenderer
                    key={component.codeFiles[activeFileIndex].codeContent.id}
                    component={component.codeFiles[activeFileIndex].codeContent}
                    position={0}
                    prevComponent={null}
                    nextComponent={null}
                    parent={component}
                  ></ComponentRenderer>
                </ExampleContext.Provider>
              </div>
            </div>
          )}
        </div>
      )}

      {expand && component.renderIdeBtn && (
        <Link href={getIdeLink()} target="_blank" className="self-end">
          <Button
            ghost
            className="hover:bg-neutral-white/50 body-s mt-2 border border-neutral-black px-[40px] py-[8px] text-neutral-black transition"
          >
            Try It Out
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ExampleRenderer;
