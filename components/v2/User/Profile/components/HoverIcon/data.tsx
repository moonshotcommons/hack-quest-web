import { FiRefreshCw, FiLink, FiEye, FiEyeOff, FiEdit3 } from 'react-icons/fi';
import { BoxType, IconType, IconValue } from './type';

export const iconList: IconType[] = [
  {
    icon: <FiRefreshCw size={20} />,
    value: IconValue.REFRESH,
    type: [BoxType.GITHUB_ACTIVITY]
  },
  {
    icon: <FiLink size={20} />,
    value: IconValue.LINK,
    type: [BoxType.GITHUB_ACTIVITY]
  },
  {
    icon: <FiEdit3 size={20} />,
    value: IconValue.EDIT,
    type: [BoxType.EXPERIENCE]
  },
  {
    icon: <FiEye size={20} />,
    value: IconValue.LINK,
    type: []
  },
  {
    icon: <FiEyeOff size={20} />,
    value: IconValue.LINK,
    type: []
  }
];
