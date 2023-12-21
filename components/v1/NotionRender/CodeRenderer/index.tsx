import { FC, useContext, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { NotionRenderType } from '../type';
import CopyIcon from '@/components/v2/Common/Icon/Copy';
import { message } from 'antd';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';

interface CodeSourceType {
  [NotionRenderType.CODE]: {
    caption: any[];
    language: string;
    rich_text: { plain_text: string }[];
  };
}

interface CodeRendererProps {
  type: NotionRenderType.CODE;
  source: CodeSourceType;
  parent: any;
}

const CodeRenderer: FC<CodeRendererProps> = (props) => {
  const { type, source } = props;
  const language = source[type].language;
  const { theme } = useContext(ThemeContext);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="py-4 relative">
      <SyntaxHighlighter
        style={theme === Theme.Dark ? oneDark : oneLight}
        language={language}
        className="scroll-wrap-x"
      >
        {source[type].rich_text
          .map((richText: any) => richText.plain_text)
          .join('')}
      </SyntaxHighlighter>
      {/* <textarea className="hidden" ref={codeRef} value={}></textarea> */}
      <div
        className="absolute flex justify-center py-2 px-2 gap-2 items-center top-[30px] right-8 text-[0.75rem] font-next-book text-lesson-code-copy-button-text bg-lesson-code-copy-button-bg rounded-[0.5rem] cursor-pointer"
        onClick={async (e) => {
          try {
            await navigator.clipboard.writeText(
              source[type].rich_text
                .map((richText: any) => richText.plain_text)
                .join('')
            );
            message.success('Copy success!');
          } catch (e) {
            message.warning('The browser version is too low or incompatible！');
          }
        }}
      >
        <CopyIcon width={17} height={20} color={'currentColor'}></CopyIcon>
        <span>Copy</span>
      </div>
    </div>
  );
};

export default CodeRenderer;
