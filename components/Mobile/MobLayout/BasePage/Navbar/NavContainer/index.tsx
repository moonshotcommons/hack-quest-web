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
      stroke="#FFF"
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
      className="absolute top-0 bottom-0 left-0 z-[100] bg-red-800"
    >
      <motion.div
        className="absolute w-screen top-[4rem] bg-neutral-black bottom-0 left-0 pointer-events-none"
        variants={sidebar}
      />
      {children}
      <button className="absolute left-0 top-0 w-[64px] h-[64px] outline-none flex justify-center items-center rounded-full bg-transparent">
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
