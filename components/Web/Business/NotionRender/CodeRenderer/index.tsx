import CopyIcon from '@/components/Common/Icon/Copy';
import { ExampleContext } from '@/components/Web/Business/Renderer/ComponentRenderer/ExampleRenderer';
import { PlaygroundContext } from '@/components/Web/LessonPage/Playground/type';
import { Theme } from '@/constants/enum';
import { BurialPoint } from '@/helper/burialPoint';
import { ThemeContext } from '@/store/context/theme';
import { message } from 'antd';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeSourceType {
  content: {
    caption: any[];
    language: string;
    rich_text: { plain_text: string }[];
  };
}

interface CodeRendererProps {
  component: CodeSourceType;
  parent: any;
}

const CodeRenderer: FC<CodeRendererProps> = (props) => {
  const { component, parent } = props;
  const language = component.content.language;
  const { theme } = useContext(ThemeContext);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const [codeContent, setCodeContent] = useState('');
  const { updateExampleContent, isExample } = useContext(ExampleContext);
  const { isPlayground } = useContext(PlaygroundContext);
  useEffect(() => {
    if (component.content.rich_text) {
      const code = component.content.rich_text
        .map((richText: any) => richText.plain_text)
        .join('');
      setCodeContent(code);
      updateExampleContent(code);
    }
  }, [component.content.rich_text, updateExampleContent]);

  return (
    <div
      className={`relative flex-1 overflow-hidden rounded-md ${
        isPlayground ? 'flex flex-col' : ''
      }`}
    >
      <div className="relative h-[6px] rounded-t-[4.8px] bg-[#fafafa]">
        <div
          className="absolute right-[9px] top-[9px] z-[10] cursor-pointer rounded-[0.5rem] text-[#E3E3E3]"
          onClick={async (e) => {
            try {
              await navigator.clipboard.writeText(
                component.content.rich_text
                  .map((richText: any) => richText.plain_text)
                  .join('')
              );
              BurialPoint.track('lesson-code复制');
              message.success('Copy success!');
            } catch (e) {
              message.warning(
                'The browser version is too low or incompatible！'
              );
            }
          }}
        >
          <CopyIcon width={17} height={21} color={'currentColor'}></CopyIcon>
          {/* <span>Copy</span> */}
        </div>
      </div>
      {isPlayground ? (
        <div className="relative w-full flex-1">
          <div className="absolute left-0 top-0 h-full w-full overflow-auto">
            <SyntaxHighlighter
              style={theme === Theme.Dark ? oneDark : oneLight}
              language={language}
              className="scroll-wrap-x scroll-wrap-y code-l mt-[0!important] h-full rounded-t-[0!important]"
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
