import { createContext } from 'react';
import {
  BLOCKS_PREFIX,
  BLOCK_PREFIX,
  IS_CODE_HIGHLIGHTER,
  PREFIX,
  SYNTAX_HIGHLIGHTER_CSS
} from '@/constants';
import { AnnotationType, RichTextType } from '@/components/TempComponent/type';

export function annotationToClassName(
  annotations: AnnotationType,
  prefix?: string
) {
  const classNames = [];
  if (annotations.bold) classNames.push(`${prefix}-bold font-black`);
  if (annotations.code) classNames.push(`${prefix}-inline-code`);
  if (annotations.italic) classNames.push(`${prefix}-italic`);
  if (annotations.strikethrough) classNames.push(`${prefix}-trikethrough`);
  if (annotations.underline) classNames.push(`${prefix}-underline`);
  if (annotations.color !== 'default')
    classNames.push(`${prefix}-color-${annotations.color}`);
  return classNames.join(' ');
}

export const Context = createContext({
  prefix: PREFIX,
  blockPrefix: BLOCK_PREFIX,
  blocksPrefix: BLOCKS_PREFIX,
  isCodeHighlighter: IS_CODE_HIGHLIGHTER,
  syntaxHighlighterCSS: SYNTAX_HIGHLIGHTER_CSS
});

/**
 *
 * @param richTextArr - array of rich_text objects
 * @returns joined text
 */
export const getJoinedRichText = (richTextArr: RichTextType[]): string => {
  const textArr = richTextArr.map((richText: any) => richText.plain_text);
  return textArr.join('');
};
