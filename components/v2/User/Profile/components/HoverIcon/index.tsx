import React, { useMemo } from 'react';

import { BoxType, IconType, IconValue } from './type';
import { iconList } from './data';
import { Tooltip } from 'antd';

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
          <Tooltip
            placement="top"
            overlayInnerStyle={{
              color: '#0b0b0b',
              fontSize: '12px',
              padding: '20px'
            }}
            color="#fff"
            title={editTip}
          >
            <div className="w-full h-full flex-center">{icon.icon}</div>
          </Tooltip>
        );
      default:
        return <span>{icon.icon}</span>;
    }
  };
  return (
    <div className="flex gap-[10px]">
      {list.map((v: IconType, i: number) => (
        <div
          key={v.value}
          onClick={() => handleClick(v.value)}
          className="text-[#231F20] flex-center w-[45px] h-[45px] rounded-[50%] bg-[#f4f4f4] cursor-pointer hover:text-[#8c8c8c] hover:bg-[#DADADA]"
        >
          {renderIcon(v)}
        </div>
      ))}
    </div>
  );
};

export default HoverIcon;
