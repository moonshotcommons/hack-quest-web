import DropAnswer from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/[lessonId]/components/UgcRender/UgcComponentRenderer/QuizRenderer/QuizBRenderer/DropAnswer';
import { cn } from '@/helper/utils';
import { FC, useContext } from 'react';
import MathJax from 'react-mathjax';
import { RendererContext } from '@/components/Web/Business/Renderer/context';
import { NotionType } from '@/components/Web/Business/Renderer/type';

export interface TextRendererProps {
  richTextArr: any;
  fontSize?: string;
  letterSpacing?: string;
  type?: NotionType;
}

export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};

const TextRenderer: FC<TextRendererProps> = (props) => {
  const {
    richTextArr,
    fontSize: propsFontSize,
    letterSpacing = '0.28px',
    type
  } = props;

  const {
    fontSize: contextFontSize,
    textStyle,
    codeStyle
  } = useContext(RendererContext).textRenderer! || { fontSize: '14px' };
  const fontSize = propsFontSize || contextFontSize;

  const getTextClassNames = (annotations: AnnotationType) => {
    const className = cn(
      'font-Nunito text-[18px] font-normal leading-[160%] tracking-normal',
      textStyle &&
        ![NotionType.H1, NotionType.H2, NotionType.H3].includes(type!)
        ? textStyle
        : '',
      type === NotionType.H1
        ? 'font-next-book-bold text-[54px] font-extrabold leading-[54px] tracking-normal'
        : '',
      type === NotionType.H2
        ? 'font-next-book-bold text-[40px] font-extrabold leading-[40px] tracking-normal '
        : '',
      type === NotionType.H3
        ? 'font-next-book-bold text-[28px] font-extrabold leading-normal tracking-normal'
        : '',
      annotations.bold ? 'font-bold' : '',
      annotations.code
        ? !codeStyle
          ? 'px-[0.2rem] text-[85%] text-[#eb5757] bg-renderer-code-bg mx-[0.25rem]'
          : codeStyle
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

  return (
    <>
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
        //处理blog中 居中的text
        if (
          richText.plain_text.indexOf('<<image>>') === 0 ||
          richText.plain_text.indexOf('<<video>>') === 0
        ) {
          const plain_text = richText.plain_text.replace(
            /<<image>>|<<video>>/,
            ''
          );
          if (richTextArr[index + 1]) {
            const nextPlainText = richTextArr[index + 1].plain_text;
            richTextArr[index + 1].plain_text =
              `${plain_text}${nextPlainText}<<image>>`;
            return null;
          } else {
            return (
              <p key={index} className="mb-[30px] pt-[10px] text-center">
                <span
                  key={index}
                  className={`${className} caption-14pt rounded-md text-neutral-rich-gray`}
                  style={{
                    fontSize,
                    letterSpacing,
                    color:
                      annotations.color !== 'default' &&
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
                  {plain_text}
                </span>
              </p>
            );
          }
        }
        if (
          richText.plain_text.indexOf('<<image>>') > 0 ||
          richText.plain_text.indexOf('<<video>>') > 0
        ) {
          const plain_text = richText.plain_text.replace(
            /<<image>>|<<video>>/g,
            ''
          );
          if (richText.href) {
            return (
              <p key={index} className="text-center">
                <a
                  target="_blank"
                  href={richText.href}
                  className={`${className} break-words py-1 underline`}
                  style={{
                    fontSize,
                    letterSpacing,
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
                  {plain_text}
                </a>
              </p>
            );
          }

          return (
            <p key={index} className="text-center">
              <span
                key={index}
                className={`${className} rounded-md leading-[200%]`}
                style={{
                  fontSize,
                  letterSpacing,
                  color:
                    annotations.color !== 'default' &&
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
                {plain_text}
              </span>
            </p>
          );
        }

        if (richText.href) {
          return (
            <a
              target="_blank"
              key={index}
              href={richText.href}
              className={`${className} break-words py-1 underline`}
              style={{
                fontSize,
                letterSpacing,
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
            className={`${className} rounded-md `}
            style={{
              fontSize,
              letterSpacing,
              color:
                annotations.color !== 'default' &&
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
    </>
  );
};

export default TextRenderer;