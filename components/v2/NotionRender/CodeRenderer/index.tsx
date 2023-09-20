import CopyIcon from '@/components/Common/Icon/Copy';
import { Theme } from '@/constants/enum';
import { BurialPoint } from '@/helper/burialPoint';
import { ThemeContext } from '@/store/context/theme';
import { message } from 'antd';
import { FC, useContext, useRef } from 'react';
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
  const { component } = props;
  const language = component.content.language;
  const { theme } = useContext(ThemeContext);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="relative rounded-md h-full">
      <div className="h-[6px] relative">
        <div
          className="absolute top-[9px] right-[9px] text-[0.75rem] font-next-book text-[#E3E3E3] rounded-[0.5rem] cursor-pointer"
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
      <SyntaxHighlighter
        style={theme === Theme.Dark ? oneDark : oneLight}
        language={language}
        className="scroll-wrap-x font-next-poster-Bold h-[calc(100%-20px)]"
        showLineNumbers
      >
        {component.content.rich_text
          .map((richText: any) => richText.plain_text)
          .join('')}
      </SyntaxHighlighter>
      {/* <textarea className="hidden" ref={codeRef} value={}></textarea> */}
    </div>
  );
};

export default CodeRenderer;
