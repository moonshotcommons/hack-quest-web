import { NotionRenderType, RichTextType } from '@/components/NotionRender/type';
import { cn } from '@/helper/utils';
import { FC, HTMLAttributes, ReactNode } from 'react';

export const getJoinedRichText = (richTextArr: RichTextType[]): string => {
  const textArr = richTextArr.map((richText: any) => richText.plain_text);
  return textArr.join('');
};

interface DialogBoxPropsType {
  direction: 'left' | 'right';
  children: ReactNode;
}

export const DialogBox: FC<
  DialogBoxPropsType & HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { direction, children, className, ...rest } = props;

  const classNames = cn(
    `w-fit px-[2rem] py-[1.5rem] bg-[#202020] text-[0.875rem] leading-[121%] text-[#EDEDED]`,
    className,
    direction === 'left' ? 'rounded-t-[2.5rem] rounded-br-[2.5rem]' : '',
    direction === 'right' ? 'rounded-l-[2.5rem] rounded-tr-[2.5rem]' : ''
  );

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const formatSource = (source: any[]) => {
  return source.map((item: any) => {
    let type = item.type;
    const text = getJoinedRichText(item[type].rich_text);
    if (text.trim().startsWith('V：')) {
      return {
        type: 'left',
        content: text.replace('V：', '').trim(),
        source: item,
        isAuto: true
        // render(sourceObject: any) {
        //   return (
        //     <DialogBox
        //       direction={sourceObject.type}
        //       content={sourceObject.content}
        //     ></DialogBox>
        //   );
        // }
      };
    }

    if (
      text.trim().startsWith('你：') &&
      text.replace('你：', '').trim() &&
      !item.children?.length
    ) {
      return {
        type: 'right',
        content: text.replace('你：', '').trim(),
        source: item
        // render(sourceObject: any, setSourceList: Function) {
        //   return (
        //     <DialogBox
        //       direction={sourceObject.type}
        //       content={sourceObject.content}
        //     ></DialogBox>
        //   );
        // }
      };
    }

    if (text.trim().startsWith('你：') && item.children?.length) {
      return {
        type: 'select',
        source: item,
        children: item.children.map((child: any) => {
          const type = child.type;
          if (type === NotionRenderType.TOGGLE) {
            const text = getJoinedRichText(child[type].rich_text);
            // console.log(text);
            const childRes = {
              type: 'right',
              content: text,
              source: child
            };
            return childRes;
          }
        })
      };
    }
  });
};
