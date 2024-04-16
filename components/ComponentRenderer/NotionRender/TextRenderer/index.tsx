// import DropAnswer from '@/components/Web/Business/Renderer/ComponentRenderer/QuizRenderer/QuizBRenderer/DropAnswer';
import { cn } from '@/helper/utils';
import { FC, useEffect, useRef } from 'react';
import MathJax from 'react-mathjax';
import { useQuizBRendererContext } from '../..';

interface TextRendererProps {
  richTextArr: any;
  letterSpacing?: string;
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
    // `py-1`,
    annotations.bold ? 'font-bold' : '',
    annotations.code ? 'px-2 py-1 text-[85%] text-[#eb5757] bg-renderer-code-bg mx-[0.25rem]' : '',
    annotations.italic ? 'italic' : '',
    annotations.strikethrough ? '' : '',
    annotations.underline ? 'underline' : '',
    annotations.color !== 'default'
      ? `${annotations.color.includes('background') ? `bg-[${annotations.color}]` : `text-${annotations.color}-400`}`
      : ''
  );
  return className;
};

const TextRenderer: FC<TextRendererProps> = (props) => {
  const { richTextArr, letterSpacing = '0.28px' } = props;
  const { DropAnswerComponent } = useQuizBRendererContext();

  const centerTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (centerTextRef.current) {
      centerTextRef.current.parentElement?.classList.add('text-center');
    }
  }, []);

  return (
    <>
      {richTextArr.map((richText: any, index: number) => {
        const annotations = richText.annotations;
        const className = getTextClassNames(annotations);

        if (richText.annotations.code && /(@@)(((.|\n)*?))((##))/gim.test(richText.plain_text)) {
          return (
            <DropAnswerComponent
              key={index}
              answer={[...richText.plain_text.matchAll(/(@@)((.|\n)*?)(##)/gim)].map((item) => item[2].trim())[0]}
            ></DropAnswerComponent>
          );
        }
        //处理blog中 居中的text
        if (richText.plain_text.indexOf('<<image>>') === 0) {
          const plain_text = richText.plain_text.replace(/<<image>>/, '');
          if (richTextArr[index + 1]) {
            const nextPlainText = richTextArr[index + 1].plain_text;
            richTextArr[index + 1].plain_text = `${plain_text}${nextPlainText}<<image>>`;
            return null;
          } else {
            return (
              <span key={index} className="inline-block" ref={centerTextRef}>
                <span
                  key={index}
                  className={`${className} whitespace-pre-line rounded-md leading-[200%]`}
                  style={{
                    letterSpacing,
                    color:
                      annotations.color !== 'default' && !annotations.color.includes('background')
                        ? annotations.color
                        : '',
                    backgroundColor:
                      annotations.color !== 'default' && annotations.color.includes('background')
                        ? annotations.color
                        : ''
                  }}
                >
                  {plain_text}
                </span>
              </span>
            );
          }
        }
        if (richText.plain_text.indexOf('<<image>>') > 0) {
          const plain_text = richText.plain_text.replace(/<<image>>/g, '');
          if (richText.href) {
            return (
              <span key={index} className="inline-block" ref={centerTextRef}>
                <a
                  target="_blank"
                  href={richText.href}
                  className={`${className} whitespace-pre-line break-words underline hover:text-yellow-dark hover:underline`}
                  style={{
                    letterSpacing,
                    color:
                      annotations.color !== 'default' && !annotations.code && !annotations.color.includes('background')
                        ? annotations.color
                        : '',
                    backgroundColor:
                      annotations.color !== 'default' && annotations.color.includes('background')
                        ? annotations.color
                        : ''
                  }}
                >
                  {plain_text}
                </a>
              </span>
            );
          }

          return (
            <span key={index} className="text-center" ref={centerTextRef}>
              <span
                key={index}
                className={`${className} whitespace-pre-line rounded-md leading-[200%]`}
                style={{
                  letterSpacing,
                  color:
                    annotations.color !== 'default' && !annotations.color.includes('background')
                      ? annotations.color
                      : '',
                  backgroundColor:
                    annotations.color !== 'default' && annotations.color.includes('background') ? annotations.color : ''
                }}
              >
                {plain_text}
              </span>
            </span>
          );
        }

        if (richText.href) {
          return (
            <a
              target="_blank"
              key={index}
              href={richText.href}
              className={`${className} whitespace-pre-line break-words underline hover:text-yellow-dark hover:underline`}
              style={{
                letterSpacing,
                color:
                  annotations.color !== 'default' && !annotations.code && !annotations.color.includes('background')
                    ? annotations.color
                    : '',
                backgroundColor:
                  annotations.color !== 'default' && annotations.color.includes('background') ? annotations.color : ''
              }}
            >
              {richText.plain_text}
            </a>
          );
        }

        if (richText.equation) {
          return (
            <span key={index}>
              <MathJax.Provider>
                <span className="[&>div]:inline-block">
                  <MathJax.Node formula={richText.equation.expression} />
                </span>
              </MathJax.Provider>
            </span>
          );
        }
        return (
          <span
            key={index}
            className={`${className} whitespace-pre-line rounded-md`}
            style={{
              letterSpacing,
              color:
                annotations.color !== 'default' && !annotations.color.includes('background') ? annotations.color : '',
              backgroundColor:
                annotations.color !== 'default' && annotations.color.includes('background') ? annotations.color : ''
            }}
          >
            {richText.plain_text}
          </span>
        );
      })}
    </>
  );
};

export default TextRenderer;
