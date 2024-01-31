import React, { HTMLAttributes, ReactNode } from 'react';

import Tooltip, { TooltipProps } from '@/components/Common/Tooltip';
import { cn } from '@/helper/utils';
import { hoverIcons } from './data';
import { IconType } from './type';

interface HoverIconProp {
  icon?: ReactNode;
  type?: IconType;
  tooltip?: string;
  tooltipProps?: Omit<TooltipProps, 'title' | 'children'>;
  className?: string;
}

const HoverIcon: React.FC<HoverIconProp & HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const { className, tooltip, icon, type, tooltipProps, ...rest } = props;

  const iconWrap = (
    <div
      className={cn(
        'flex-center h-[45px] w-[45px] cursor-pointer rounded-[50%] bg-neutral-off-white text-[#231F20] hover:bg-[#DADADA] hover:text-neutral-medium-gray',
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
