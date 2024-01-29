import { FC, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { NavbarListType } from '../type';
import Link from 'next/link';
import { itemVariants } from '../constant';
interface NavListProps {
  navList: NavbarListType[];
  toggleOpen: VoidFunction;
  children: ReactNode;
}

const NavList: FC<NavListProps> = ({ navList, toggleOpen, children }) => {
  const [openNavKeys, setOpenNavKeys] = useState<string[]>([]);
  return (
    <motion.div
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          pointerEvents: 'auto'
        },
        closed: {
          // transition: { staggerChildren: 0.05, staggerDirection: -1 },
          pointerEvents: 'none'
        }
      }}
      className="absolute top-[4rem] bottom-0 w-screen pt-[1.875rem] px-5"
    >
      <motion.ul className={`w-full`}>
        {navList.map((item, index) => {
          return (
            <motion.li
              key={index}
              variants={itemVariants}
              className="body-xl font-Nunito flex flex-col w-full"
            >
              <div
                className="w-full py-[.6875rem] flex justify-between items-center"
                onClick={() => {
                  if (openNavKeys.includes(item.id)) {
                    setOpenNavKeys(
                      openNavKeys.filter((key) => key !== item.id)
                    );
                  } else {
                    setOpenNavKeys(openNavKeys.concat(item.id));
                  }
                }}
              >
                <span>{item.label}</span>
                <div className="h-full px-5">
                  {item.menu?.length > 0 && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.6663 7.99967C14.6663 8.36786 14.3679 8.66634 13.9997 8.66634H8.66634V13.9997C8.66634 14.3679 8.36786 14.6663 7.99967 14.6663C7.63148 14.6663 7.33301 14.3679 7.33301 13.9997V8.66634H1.99967C1.63148 8.66634 1.33301 8.36786 1.33301 7.99967C1.33301 7.63148 1.63148 7.33301 1.99967 7.33301H7.33301V1.99967C7.33301 1.63148 7.63148 1.33301 7.99967 1.33301C8.36786 1.33301 8.66634 1.63148 8.66634 1.99967V7.33301H13.9997C14.3679 7.33301 14.6663 7.63148 14.6663 7.99967Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {item.menu?.length > 0 && openNavKeys.includes(item.id) && (
                <ul className="pb-8 flex flex-col">
                  {item.menu.map((m, i) => {
                    return (
                      <Link
                        key={m.label}
                        className="body-l font-Nunito mb-[.625rem]"
                        href={m.path}
                        onClick={() => {
                          toggleOpen();
                        }}
                      >
                        {m.label}
                      </Link>
                    );
                  })}
                </ul>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
      <motion.div
        variants={itemVariants}
        className="w-full my-[1.5625rem] h-[1px] bg-neutral-white"
      ></motion.div>
      {children}
    </motion.div>
  );
};

export default NavList;
