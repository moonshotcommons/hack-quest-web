import { FC, ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { NotionRenderType } from '../type';

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
  return (
    <div>
      <SyntaxHighlighter style={oneDark} language={language}>
        {source[type].rich_text
          .map((richText: any) => richText.plain_text)
          .join('')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeRenderer;
