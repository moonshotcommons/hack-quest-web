import { Children, FC } from 'react';
import { BlockProps } from './type';
import {
  BLOCKS_PREFIX,
  BLOCK_PREFIX,
  IS_CODE_HIGHLIGHTER,
  // IS_NEXTJS,
  PREFIX,
  SYNTAX_HIGHLIGHTER_CSS
} from '@/constants';
import { Context } from '@/helper/block';
import NotionBlockCore from './NotionBlockCore';

export const NotionBlock: FC<BlockProps> = ({
  block,
  prefix,
  blockPrefix,
  blocksPrefix,
  // isNextJS,
  isCodeHighlighter,
  syntaxHighlighterCSS,
  darkMode = true,
  children
}) => {
  console.log(children);
  return (
    <Context.Provider
      key={block.id}
      value={{
        prefix: prefix !== undefined ? prefix : PREFIX,
        blockPrefix: blockPrefix !== undefined ? blockPrefix : BLOCK_PREFIX,
        blocksPrefix: blocksPrefix !== undefined ? blocksPrefix : BLOCKS_PREFIX,
        // isNextJS: isNextJS !== undefined ? isNextJS : IS_NEXTJS,
        isCodeHighlighter:
          isCodeHighlighter !== undefined
            ? isCodeHighlighter
            : IS_CODE_HIGHLIGHTER,
        syntaxHighlighterCSS:
          syntaxHighlighterCSS !== undefined
            ? syntaxHighlighterCSS
            : SYNTAX_HIGHLIGHTER_CSS
      }}
    >
      <NotionBlockCore block={block} darkMode={darkMode}>
        {children}
      </NotionBlockCore>
    </Context.Provider>
  );
};

export default NotionBlock;
