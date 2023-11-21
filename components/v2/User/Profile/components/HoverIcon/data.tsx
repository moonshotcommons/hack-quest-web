import { FiRefreshCw, FiLink, FiEye, FiEyeOff } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { IconType } from './type';
import { BoxType } from '../../type';
import { GoUnlink } from 'react-icons/go';

export const hoverIcons = {
  [IconType.EDIT]: <CiEdit size={26} />,
  [IconType.REFRESH]: <FiRefreshCw size={20} />,
  [IconType.UN_LINK]: <GoUnlink size={20} />,
  [IconType.SHOW]: <FiEye size={20} />,
  [IconType.UN_SHOW]: <FiEyeOff size={20} />
};
