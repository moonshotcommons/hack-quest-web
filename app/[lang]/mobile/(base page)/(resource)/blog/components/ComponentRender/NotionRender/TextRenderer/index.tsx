import DropAnswer from '@/components/Web/Business/Renderer/ComponentRenderer/QuizRenderer/QuizBRenderer/DropAnswer';
import { cn, deepClone } from '@/helper/utils';
import { FC, useContext } from 'react';
import MathJax from 'react-mathjax';
import TextCenterRenderer from '../TextCenterRenderer';
import { RendererContext } from '@/components/Web/Business/Renderer/context';

export interface TextRendererProps {
  richTextArr: any;
  fontSize?: string;
  letterSpacing?: string;
  fontStyle?: string;
  fontFamily?: string;
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
    `py-1`,
    annotations.bold ? 'font-bold' : '',
    annotations.code ? 'px-[0.2rem] text-[85%] text-[#eb5757] bg-renderer-code-bg mx-[0.25rem]' : '',
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
  const { richTextArr, fontSize: propsFontSize, letterSpacing = '0.36px', fontStyle = '', fontFamily } = props;

  const { fontSize: contextFontSize } = useContext(RendererContext).textRenderer! || { fontSize: '14px' };
  const fontSize = propsFontSize || contextFontSize || '18px';

  //处理blog居中的text
  if (richTextArr[0]?.plain_text?.includes('<<image>>')) {
    const newRichTextArr = deepClone(richTextArr);
    newRichTextArr[0].plain_text = newRichTextArr[0].plain_text.replace(/<<image>>/g, '');
    const newProps = {
      ...props,
      richTextArr: newRichTextArr
    };
    return <TextCenterRenderer {...newProps} />;
  }

  return (
    <>
      {richTextArr.map((richText: any, index: number) => {
        const annotations = richText.annotations;
        const className = getTextClassNames(annotations);

        if (richText.annotations.code && /(@@)(((.|\n)*?))((##))/gim.test(richText.plain_text)) {
          return (
            <DropAnswer
              key={index}
              answer={[...richText.plain_text.matchAll(/(@@)((.|\n)*?)(##)/gim)].map((item) => item[2].trim())[0]}
            ></DropAnswer>
          );
        }

        if (richText.href) {
          return (
            <a
              target="_blank"
              key={index}
              href={richText.href}
              className={`${className} break-words py-1 underline ${fontStyle}`}
              style={{
                fontSize,
                letterSpacing,
                fontFamily,
                color:
                  annotations.color !== 'default' && !annotations.code && !annotations.color.includes('background')
                    ? annotations.color
                    : '',
                backgroundColor: annotations.color !== 'default' && annotations.color.includes('background') ? annotations.color : ''
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
            className={`${className} rounded-md leading-[160%] ${fontStyle}`}
            style={{
              fontSize,
              letterSpacing,
              fontFamily,
              color: annotations.color !== 'default' && !annotations.color.includes('background') ? annotations.color : '',
              backgroundColor: annotations.color !== 'default' && annotations.color.includes('background') ? annotations.color : ''
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
