import { FC } from 'react';
import { annotationToClassName, Context } from '@/helper/block';
import { useContext } from 'react';
import { TextProps } from './type';
import MathJax from 'react-mathjax';
const TextRenderer: FC<TextProps> = ({ richTextArr }) => {
  const { prefix } = useContext(Context);
  const linkName = `${prefix}-link`;
  return (
    <>
      {richTextArr.map((richText: any, index: number) => {
        const className = annotationToClassName(richText.annotations, prefix);
        if (richText.href) {
          return (
            <a
              key={index}
              href={richText.href}
              className={`${linkName} ${className}`}
            >
              {richText.plain_text}
            </a>
          );
        }
        if (richText.equation) {
          return (
            <span key={index}>
              <MathJax.Provider>
                <span>
                  <MathJax.Node formula={richText.equation.expression} inline />
                </span>
              </MathJax.Provider>
            </span>
          );
        }

        return (
          <span key={index} className={className}>
            {richText.plain_text}
          </span>
        );
      })}
    </>
  );
};
export default TextRenderer;
