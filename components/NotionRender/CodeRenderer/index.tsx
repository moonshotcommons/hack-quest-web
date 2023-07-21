import { FC, LegacyRef, ReactNode, RefObject, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { NotionRenderType } from '../type';
import CopyIcon from '@/components/Common/Icon/Copy';
import { message } from 'antd';

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
  console.log(source);
  const language = source[type].language;

  const codeRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="py-4 relative">
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        className="scroll-wrap-x"
      >
        {source[type].rich_text
          .map((richText: any) => richText.plain_text)
          .join('')}
      </SyntaxHighlighter>
      {/* <textarea className="hidden" ref={codeRef} value={}></textarea> */}
      <div
        className="absolute flex justify-center py-2 px-2 gap-2 items-center top-10 right-8 text-[0.75rem] font-next-book text-black bg-[#E3E3E3] rounded-[0.5rem] cursor-pointer"
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
        <CopyIcon width={17} height={20} color={'#E3E3E3'}></CopyIcon>
        <span>Copy</span>
      </div>
    </div>
  );
};

export default CodeRenderer;
