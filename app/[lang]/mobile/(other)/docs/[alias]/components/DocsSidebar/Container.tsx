'use client';
import { cn } from '@/helper/utils';
import { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
interface SidebarContainerProps extends PropsWithChildren {
  open: boolean;
}

const SidebarContainer: FC<SidebarContainerProps> = ({ open, children }) => {
  return (
    <motion.div
      className={cn(
        'fixed left-0 top-[64px] h-[calc(100vh-64px)] w-[296px] bg-neutral-off-white py-10 shadow-[2px_0px_4px_0px_rgba(0,0,0,0.12)]',
        open ? 'block' : 'hidden'
      )}
    >
      {children}
    </motion.div>
  );
};

export default SidebarContainer;
