import React, { HTMLAttributes, ReactNode, useMemo } from 'react';

import { IconType } from './type';
import { BoxType } from '../../type';
import Tooltip, { TooltipProps } from '@/components/v2/Common/Tooltip';
import { spawn } from 'child_process';
import { hoverIcons } from './data';
import { cn } from '@/helper/utils';

interface HoverIconProp {
  icon?: ReactNode;
  type?: IconType;
  tooltip?: string;
  tooltipProps?: Omit<TooltipProps, 'title' | 'children'>;
  className?: string;
}

// const HoverIcon: React.FC<HoverIconProp> = ({
//   boxType,
//   handleClick,
//   editTip
// }) => {
//   const list = useMemo(() => {
//     return iconList.filter((v) => ~v.type.indexOf(boxType));
//   }, [boxType]);

//   const renderIcon = (icon: IconType) => {
//     switch (icon.value) {
//       case IconValue.EDIT:
//         return (
//           <Tooltip key={icon.value} placement="topRight" title={editTip}>
//             <div
//               onClick={() => handleClick(icon.value)}
//               className="text-[#231F20] flex-center w-[45px] h-[45px] rounded-[50%] bg-[#f4f4f4] cursor-pointer hover:text-[#8c8c8c] hover:bg-[#DADADA]"
//             >
//               <div className="w-full h-full flex-center">{icon.icon}</div>
//             </div>
//           </Tooltip>
//         );
//       default:
//         return (
//           <div
//             key={icon.value}
//             onClick={() => handleClick(icon.value)}
//             className="text-[#231F20] flex-center w-[45px] h-[45px] rounded-[50%] bg-[#f4f4f4] cursor-pointer hover:text-[#8c8c8c] hover:bg-[#DADADA]"
//           >
//             <span>{icon.icon}</span>
//           </div>
//         );
//     }
//   };
//   return (
//     <div className="flex gap-[10px]">
//       {list.map((v: IconType, i: number) => renderIcon(v))}
//     </div>
//   );
// };

const HoverIcon: React.FC<HoverIconProp & HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const { className, tooltip, icon, type, tooltipProps, ...rest } = props;

  const iconWrap = (
    <div
      className={cn(
        'text-[#231F20] flex-center w-[45px] h-[45px] rounded-[50%] bg-[#f4f4f4] cursor-pointer hover:text-[#8c8c8c] hover:bg-[#DADADA]',
        className
      )}
      {...rest}
    >
      {icon || (!!type && hoverIcons[type])}
    </div>
  );

  return (
    <>
      {tooltip && (
        <Tooltip title={tooltip} {...tooltipProps}>
          {iconWrap}
        </Tooltip>
      )}
      {!tooltip && iconWrap}
    </>
  );
};

export default HoverIcon;
