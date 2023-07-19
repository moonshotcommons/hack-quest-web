import { FC, ReactNode } from 'react';

interface TextRendererProps {
  richTextArr: any;
}

const TextRenderer: FC<TextRendererProps> = (props) => {
  const { richTextArr } = props;
  return (
    <>
      {richTextArr.map((richText: any, index: number) => {
        if (richText.href) {
          return (
            <a key={index} href={richText.href}>
              {richText.plain_text}
            </a>
          );
        }

        return <span key={index}>{richText.plain_text}</span>;
      })}
    </>
  );
};

export default TextRenderer;
