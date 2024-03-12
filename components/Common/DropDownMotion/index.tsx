import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import { animateProps } from './type';
import { cn } from '@/helper/utils';

interface DropDownMotionProp {
  className?: string;
  children: ReactNode;
  open: boolean;
}

const DropDownMotion: React.FC<DropDownMotionProp> = ({
  className = '',
  children,
  open
}) => {
  return open ? (
    <motion.ul
      {...animateProps}
      className={cn('absolute bottom-[3px] z-[999]', className)}
    >
      {children}
    </motion.ul>
  ) : null;
};

export default DropDownMotion;