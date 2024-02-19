import { FC, ReactNode } from 'react';
import { IconTextTagType, tagConfig } from './constant';

interface IconTextTagProps {
  type: IconTextTagType;
  icon?: ReactNode;
  text?: ReactNode;
}

const IconTextTag: FC<IconTextTagProps> = (props) => {
  const { type, icon: propIcon, text: propText } = props;
  const icon = propIcon ?? tagConfig[type].icon;
  const text = propText ?? tagConfig[type].text;
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="body-m">{text}</span>
    </div>
  );
};

export default IconTextTag;
