import React, { ReactNode, FC, useRef } from 'react';
import { motion } from 'framer-motion';

import { sidebar } from '../constant';
import { useDimensions } from './use-dimensions';
interface NavProps {
  children: ReactNode;
  isOpen: boolean;
  toggleOpen: VoidFunction;
}

const Nav: FC<NavProps> = ({ children, isOpen, toggleOpen }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="#131313"
      strokeLinecap="round"
      {...props}
    />
  );

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className="absolute bottom-0 left-0 top-0 z-[100]"
    >
      <motion.div
        className="pointer-events-none absolute left-0 top-[4rem] h-[calc(100vh-4rem)] w-screen overflow-hidden bg-neutral-white"
        variants={sidebar}
      />
      {children}
      <button className="absolute left-0 top-0 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-transparent outline-none">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          onClick={() => toggleOpen()}
        >
          <Path
            variants={{
              closed: { d: 'M 2 2.5 L 20 2.5' },
              open: { d: 'M 3 16.5 L 17 2.5' }
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: 'M 2 16.346 L 20 16.346' },
              open: { d: 'M 3 2.5 L 17 16.346' }
            }}
          />
        </svg>
      </button>
    </motion.nav>
  );
};

export default Nav;
