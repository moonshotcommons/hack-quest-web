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
        'text-[#231F20] flex-center w-[45px] h-[45px] rounded-[50%] bg-neutral-off-white cursor-pointer hover:text-neutral-medium-gray hover:bg-[#DADADA]',
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
