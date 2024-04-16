import CopyIcon from '@/components/Common/Icon/Copy';
import { Theme } from '@/constants/enum';
import { BurialPoint } from '@/helper/burialPoint';
import { ThemeContext } from '@/store/context/theme';
import { message } from 'antd';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useCodeRendererContext, useExampleRendererContext, useGlobalRendererContext } from '../..';
import { NotionComponent } from '../type';
import { CustomComponent, PageType } from '../../type';
import { HEADING_TYPES } from '../HeaderRenderer';
import { cn } from '@/helper/utils';

interface CodeSourceType {
  type: string;
  content: {
    caption: any[];
    language: string;
    rich_text: { plain_text: string }[];
  };
}

interface CodeRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: CodeSourceType;
  parent: any;
}

const CodeRenderer: FC<CodeRendererProps> = (props) => {
  const { component, parent, nextComponent, prevComponent } = props;
  const language = component.content.language;
  const { theme } = useContext(ThemeContext);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const [codeContent, setCodeContent] = useState('');
  const { updateExampleContent, isExample } = useExampleRendererContext();
  const { isPlayground } = useCodeRendererContext();
  const { pageType, isMobile } = useGlobalRendererContext();

  useEffect(() => {
    if (component.content.rich_text) {
      const code = component.content.rich_text.map((richText: any) => richText.plain_text).join('');
      setCodeContent(code);
      updateExampleContent(code);
    }
  }, [component.content.rich_text, updateExampleContent]);

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn('my-[5px] body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.UGC:
        return cn('my-[5px] body-m', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.MINI:
        return cn('my-[5px] body-m', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return `body-s my-[14px]`;
    }
  };

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn('my-2 body-s', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.UGC:
        return cn('my-2 body-l', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.MINI:
        return cn('my-2 body-l', HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '');
      case PageType.GLOSSARY:
      case PageType.BLOG:
      default:
        return 'body-l my-[18px]';
    }
  };

  return (
    <div
      datatype={component.type}
      className={cn(
        `relative flex-1 overflow-hidden rounded-md`,
        isPlayground ? 'flex flex-col' : '',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : ''
      )}
    >
      <div className="relative h-[6px] rounded-t-[4.8px] bg-[#fafafa]">
        <div
          className="absolute right-[9px] top-[9px] z-[10] cursor-pointer rounded-[0.5rem] text-[#E3E3E3]"
          onClick={async (e) => {
            try {
              await navigator.clipboard.writeText(
                component.content.rich_text.map((richText: any) => richText.plain_text).join('')
              );
              BurialPoint.track('lesson-code复制');
              message.success('Copy success!');
            } catch (e) {
              message.warning('The browser version is too low or incompatible！');
            }
          }}
        >
          <CopyIcon width={17} height={21} color={'currentColor'}></CopyIcon>
          {/* <span>Copy</span> */}
        </div>
      </div>
      {isPlayground ? (
        <div className="relative w-full flex-1">
          <div className="scroll-wrap-x scroll-wrap-y absolute left-0 top-0 h-full w-full overflow-auto">
            <SyntaxHighlighter
              style={theme === Theme.Dark ? oneDark : oneLight}
              language={language}
              className="code-l scroll-wrap-x scroll-wrap-y mt-[0!important] h-[calc(100%-10px)] rounded-t-[0!important]"
              showLineNumbers
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <SyntaxHighlighter
          style={theme === Theme.Dark ? oneDark : oneLight}
          language={language}
          className="scroll-wrap-x scroll-wrap-y code-l mt-[0!important] h-[calc(100%-20px)] rounded-t-[0!important]"
          showLineNumbers
        >
          {codeContent}
        </SyntaxHighlighter>
      )}

      {/* <textarea className="hidden" ref={codeRef} value={}></textarea> */}
    </div>
  );
};

export default CodeRenderer;
