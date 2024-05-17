import React, { ReactNode, FC, useRef } from 'react';
import { motion } from 'framer-motion';

import { sidebar } from '../constant';
import { useDimensions } from './use-dimensions';
import { MenuIcon, XIcon } from 'lucide-react';
interface NavProps {
  children: ReactNode;
  isOpen: boolean;
  toggleOpen: VoidFunction;
}

const Nav: FC<NavProps> = ({ children, isOpen, toggleOpen }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className="absolute bottom-0 left-0 top-0 z-[100]"
    >
      <motion.div
        className="pointer-events-none absolute left-0 top-16 h-[calc(100vh-4rem)] w-screen overflow-hidden bg-neutral-white"
        variants={sidebar}
      />
      {children}
      <button
        aria-label="Toggle Sidebar"
        className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-transparent outline-none"
        onClick={toggleOpen}
      >
        {isOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
      </button>
    </motion.nav>
  );
};

export default Nav;
