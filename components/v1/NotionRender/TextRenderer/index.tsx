import { cn } from '@/helper/utils';
import { FC } from 'react';
import MathJax from 'react-mathjax';
interface TextRendererProps {
  richTextArr: any;
}

export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};

const getTextClassNames = (annotations: AnnotationType) => {
  const className = cn(
    ``,
    annotations.bold ? 'font-bold' : '',
    annotations.code
      ? 'inline-block px-[0.2rem] py-[0.4rem] text-[85%] text-[#eb5757] bg-renderer-code-bg mx-[0.25rem]'
      : '',
    annotations.italic ? 'italic' : '',
    annotations.strikethrough ? '' : '',
    annotations.underline ? 'underline' : '',
    annotations.color !== 'default'
      ? `${
          annotations.color.includes('background')
            ? `bg-[${annotations.color}]`
            : `text-${annotations.color}-400 opacity-60`
        }`
      : ''
  );
  return className;
};

const TextRenderer: FC<TextRendererProps> = (props) => {
  const { richTextArr } = props;

  return (
    <div className="">
      {richTextArr.map((richText: any, index: number) => {
        const annotations = richText.annotations;
        const className = getTextClassNames(annotations);
        if (richText.href) {
          return (
            <a
              key={index}
              href={richText.href}
              target="_blank"
              className={`${className} underline`}
              style={{ color: '#676767' }}
            >
              {richText.plain_text}
            </a>
          );
        }

        if (richText.equation) {
          return (
            <div key={index}>
              <MathJax.Provider>
                <div>
                  <MathJax.Node formula={richText.equation.expression} />
                </div>
              </MathJax.Provider>
            </div>
          );
        }
        return (
          <span
            key={index}
            className={`${className} rounded-md`}
            style={{
              color:
                annotations.color !== 'default' &&
                !annotations.code &&
                !annotations.color.includes('background')
                  ? annotations.color
                  : '',
              backgroundColor:
                annotations.color !== 'default' &&
                annotations.color.includes('background')
                  ? annotations.color
                  : ''
            }}
          >
            {richText.plain_text}
          </span>
        );
      })}
    </div>
  );
};

export default TextRenderer;
