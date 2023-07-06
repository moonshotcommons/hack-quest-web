import { FC, useContext } from 'react';
import { BlockType } from './type';
import { Context } from '@/helper/block';
import TextRenderer from './TextRenderer';

const TableOfContentsRenderer: FC<{ blocks: BlockType[] }> = ({ blocks }) => {
  const { prefix, blockPrefix } = useContext(Context);
  return (
    <>
      {blocks.map((block: any) => {
        if (
          block.type === 'heading_1' ||
          block.type === 'heading_2' ||
          block.type === 'heading_3'
        ) {
          return (
            <div
              key={block.id}
              className={`${prefix}-${blockPrefix}-table_of_contents-item-${block.type}`}
            >
              <a href={`#${block.id}`}>
                {block[block.type].rich_text && (
                  <TextRenderer richTextArr={block[block.type].rich_text} />
                )}
              </a>
            </div>
          );
        }
      })}
    </>
  );
};
export default TableOfContentsRenderer;
