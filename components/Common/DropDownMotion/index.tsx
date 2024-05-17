import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import { animateProps } from './type';
import { cn } from '@/helper/utils';

interface DropDownMotionProp {
  className?: string;
  children: ReactNode;
  open: boolean;
  isNav?: boolean;
}

const DropDownMotion: React.FC<DropDownMotionProp> = ({ className = '', children, open, isNav = false }) => {
  return open ? (
    <motion.div {...animateProps} className={cn('absolute bottom-[3px] z-[999]', className)}>
      {children}
    </motion.div>
  ) : isNav ? (
    <div className="hidden">{children}</div>
  ) : null;
};

export default DropDownMotion;
