import React, { useMemo } from 'react';

import { IconType, IconValue } from './type';
import { iconList } from './data';
import { BoxType } from '../../type';
import Tooltip from '@/components/v2/Common/Tooltip';
import { spawn } from 'child_process';

interface HoverIconProp {
  boxType: BoxType;
  handleClick: (type: IconValue) => void;
  editTip?: string;
}

const HoverIcon: React.FC<HoverIconProp> = ({
  boxType,
  handleClick,
  editTip
}) => {
  const list = useMemo(() => {
    return iconList.filter((v) => ~v.type.indexOf(boxType));
  }, [boxType]);

  const renderIcon = (icon: IconType) => {
    switch (icon.value) {
      case IconValue.EDIT:
        return (
          <Tooltip key={icon.value} placement="topRight" title={editTip}>
            <div
              onClick={() => handleClick(icon.value)}
              className="text-[#231F20] flex-center w-[45px] h-[45px] rounded-[50%] bg-[#f4f4f4] cursor-pointer hover:text-[#8c8c8c] hover:bg-[#DADADA]"
            >
              <div className="w-full h-full flex-center">{icon.icon}</div>
            </div>
          </Tooltip>
        );
      default:
        return (
          <div
            key={icon.value}
            onClick={() => handleClick(icon.value)}
            className="text-[#231F20] flex-center w-[45px] h-[45px] rounded-[50%] bg-[#f4f4f4] cursor-pointer hover:text-[#8c8c8c] hover:bg-[#DADADA]"
          >
            <span>{icon.icon}</span>
          </div>
        );
    }
  };
  return (
    <div className="flex gap-[10px]">
      {list.map((v: IconType, i: number) => renderIcon(v))}
    </div>
  );
};

export default HoverIcon;
