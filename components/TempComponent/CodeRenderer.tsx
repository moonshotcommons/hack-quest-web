import { useContext, FC } from 'react';
import {
  annotationToClassName,
  getJoinedRichText,
  Context
} from '@/helper/block';
import { CodeProps } from './type';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneLight,
  oneDark
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

/**
 * Convert the code language notation of the Notion api to the code language notation of react-syntax-highlighter.
 * https://developers.notion.com/reference/block#code-blocks
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
 */
const formatCodeLang = (lang: string) => {
  switch (lang) {
    case 'plain text':
      return 'plaintext';
    case 'objective-c':
      return 'objectivec';
    default:
      return lang;
  }
};

const CodeRenderer: FC<CodeProps> = ({
  lang,
  richTextArr,
  darkMode = true
}) => {
  const { prefix, isCodeHighlighter, syntaxHighlighterCSS } =
    useContext(Context);
  if (isCodeHighlighter) {
    return (
      <div className={`language-${formatCodeLang(lang)} syntax-highlighter`}>
        <SyntaxHighlighter
          language={formatCodeLang(lang)}
          style={darkMode ? oneDark : oneLight}
          className="syntax-highlighter-pre"
          // customStyle={{ padding: "1rem" }}
          // showLineNumbers={true}
        >
          {getJoinedRichText(richTextArr)}
        </SyntaxHighlighter>
      </div>
    );
  } else {
    return (
      <pre>
        <code className={`language-${lang}`}>
          {richTextArr.map((richText: any, index: number) => {
            const className = annotationToClassName(
              richText.annotations,
              prefix
            );
            return (
              <span key={index} className={className}>
                {/* {richText.text.content} */}
                {richText.plain_text}
              </span>
            );
          })}
        </code>
      </pre>
    );
  }
};

export default CodeRenderer;
