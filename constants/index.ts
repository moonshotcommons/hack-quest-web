import { tomorrowNightBright } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/auth/login';
export const REGISTER_PATHNAME = '/auth/register';

export const NoNeedUserInfo = [HOME_PATHNAME, REGISTER_PATHNAME, LOGIN_PATHNAME];

/**
 * code block styles of react-syntax-highlighter
 */

/**
 * initial values
 */
export const PACKAGE_NAME = 'notion-block-renderer';
export const PREFIX = 'nbr';
export const BLOCK_PREFIX = 'block';
export const BLOCKS_PREFIX = 'blocks';
export const IS_NEXTJS = false;
export const IS_CODE_HIGHLIGHTER = false;
export const SYNTAX_HIGHLIGHTER_CSS = tomorrowNightBright;

export const IMAGE_SUFFIX = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'tiff',
  'tif',
  'svg',
  'webp',
  'heif',
  'heic',
  'avif',
  'jfif',
  'pjpeg',
  'pjp'
];
