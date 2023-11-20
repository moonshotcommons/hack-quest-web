import { FiRefreshCw, FiLink, FiEye, FiEyeOff } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { IconType, IconValue } from './type';
import { BoxType } from '../../type';
import { GoUnlink } from 'react-icons/go';

export const iconList: IconType[] = [
  {
    icon: <FiRefreshCw size={20} />,
    value: IconValue.REFRESH,
    type: [BoxType.GITHUB_ACTIVITY]
  },
  {
    icon: <GoUnlink size={20} />,
    value: IconValue.UN_LINK,
    type: [BoxType.GITHUB_ACTIVITY]
  },
  {
    icon: <CiEdit size={26} />,
    value: IconValue.EDIT,
    type: [BoxType.EXPERIENCE]
  },
  {
    icon: <FiEye size={20} />,
    value: IconValue.SHOW,
    type: []
  },
  {
    icon: <FiEyeOff size={20} />,
    value: IconValue.UN_SHOW,
    type: []
  }
];
