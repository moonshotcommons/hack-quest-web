import { CiEdit } from 'react-icons/ci';
import { FiEye, FiEyeOff, FiRefreshCw } from 'react-icons/fi';
import { GoUnlink } from 'react-icons/go';
import { IconType } from './type';

export const hoverIcons = {
  [IconType.EDIT]: <CiEdit size={26} />,
  [IconType.REFRESH]: <FiRefreshCw size={20} />,
  [IconType.UN_LINK]: <GoUnlink size={20} />,
  [IconType.SHOW]: <FiEye size={20} />,
  [IconType.UN_SHOW]: <FiEyeOff size={20} />
};
