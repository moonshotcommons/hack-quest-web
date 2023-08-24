import { cn } from '@/helper/utils';
import { FC, ReactNode } from 'react';
import MathJax from 'react-mathjax';
import DropAnswer from '../../LessonPage/ComponentRenderer/QuizRenderer/QuizBRenderer/DropAnswer';
interface TextRendererProps {
  richTextArr: any;
  fontSize?: string;
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
            : `text-${annotations.color}-400`
        }`
      : ''
  );
  return className;
};

const TextRenderer: FC<TextRendererProps> = (props) => {
  const { richTextArr, fontSize = '14px' } = props;

  return (
    <div className="">
      {richTextArr.map((richText: any, index: number) => {
        const annotations = richText.annotations;
        const className = getTextClassNames(annotations);

        if (
          richText.annotations.code &&
          /(@@)(((.|\n)*?))((##))/gim.test(richText.plain_text)
        ) {
          return (
            <DropAnswer
              key={index}
              answer={
                [...richText.plain_text.matchAll(/(@@)((.|\n)*?)(##)/gim)].map(
                  (item) => item[2].trim()
                )[0]
              }
            ></DropAnswer>
          );
        }

        if (richText.href) {
          return (
            <a
              key={index}
              href={richText.href}
              className={`${className} bg-slate-800`}
              style={{ color: '#676767', fontSize }}
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
            style={{ fontSize }}
          >
            {richText.plain_text}
          </span>
        );
      })}
    </div>
  );
};

export default TextRenderer;
