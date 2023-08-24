import { FC, LegacyRef, ReactNode, RefObject, useContext, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { NotionRenderType } from '../type';
import CopyIcon from '@/components/Common/Icon/Copy';
import { message } from 'antd';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';

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
  const { component } = props;
  const language = component.content.language;
  const { theme } = useContext(ThemeContext);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="py-4 relative">
      <SyntaxHighlighter
        style={theme === Theme.Dark ? oneDark : oneLight}
        language={language}
        className="scroll-wrap-x"
      >
        {component.content.rich_text
          .map((richText: any) => richText.plain_text)
          .join('')}
      </SyntaxHighlighter>
      {/* <textarea className="hidden" ref={codeRef} value={}></textarea> */}
      <div
        className="absolute flex justify-center py-2 px-2 gap-2 items-center top-[30px] right-8 text-[0.75rem] font-next-book text-lesson-code-copy-button-text rounded-[0.5rem] cursor-pointer"
        onClick={async (e) => {
          try {
            await navigator.clipboard.writeText(
              component.content.rich_text
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
        {/* <span>Copy</span> */}
      </div>
    </div>
  );
};

export default CodeRenderer;
