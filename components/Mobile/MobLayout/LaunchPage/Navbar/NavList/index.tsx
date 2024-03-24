import { FC, ReactNode, useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { itemVariants } from '../constant';
import {
  MenuLink,
  NavbarListType
} from '@/components/Web/Layout/BasePage/Navbar/type';
import { useGlobalStore } from '@/store/zustand/globalStore';
import useGetHeight from '@/hooks/dom/useGetHeight';
import { useRedirect } from '@/hooks/router/useRedirect';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
interface NavListProps {
  navList: NavbarListType[];
  toggleOpen: VoidFunction;
  children: ReactNode;
}

const NavList: FC<NavListProps> = ({ navList: list, toggleOpen, children }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const [openNavKeys, setOpenNavKeys] = useState<string[]>([]);
  const { redirectToUrl } = useRedirect();
  const { pageHeight } = useGetHeight();

  const setTipsModalOpenState = useGlobalStore(
    (state) => state.setTipsModalOpenState
  );

  const navList = useMemo(() => {
    return list.filter((nav) => nav.id !== 'more');
  }, [list]);

  return (
    <motion.div
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          pointerEvents: 'auto',
          overflow: 'scroll',
          height: pageHeight
        },
        closed: {
          // transition: { staggerChildren: 0.05, staggerDirection: -1 },
          pointerEvents: 'none'
        }
      }}
      className="absolute top-[4rem] w-screen  px-5 pt-[1.875rem]"
      style={{
        height: pageHeight
      }}
    >
      <motion.ul className={`w-full`}>
        {navList.map((item, index) => {
          return (
            <motion.li
              key={index}
              variants={itemVariants}
              className="body-xl flex w-full flex-col"
            >
              <div
                className="flex w-full items-center justify-between py-[.6875rem]"
                onClick={() => {
                  if (item.menu.length > 1) {
                    if (openNavKeys.includes(item.id)) {
                      setOpenNavKeys(
                        openNavKeys.filter((key) => key !== item.id)
                      );
                    } else {
                      setOpenNavKeys(openNavKeys.concat(item.id));
                    }
                  } else {
                    const menu = item.menu[0];
                    if (menu) {
                      if (menu.needPC) {
                        setTipsModalOpenState(true);
                      } else {
                        redirectToUrl(menu.path!);
                        toggleOpen();
                      }
                    }
                  }
                }}
              >
                <span>{t(item.id)}</span>
                <div className="h-full px-5">
                  {item.menu?.length > 1 &&
                    (openNavKeys.includes(item.id) ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6663 7.99967C14.6663 8.36786 14.3679 8.66634 13.9997 8.66634H1.99967C1.63148 8.66634 1.33301 8.36786 1.33301 7.99967C1.33301 7.63148 1.63148 7.33301 1.99967 7.33301H13.9997C14.3679 7.33301 14.6663 7.63148 14.6663 7.99967Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
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
                    ))}
                </div>
              </div>
              {item.menu?.length > 1 && openNavKeys.includes(item.id) && (
                <ul className="flex flex-col pb-8">
                  {item.menu.map((m) => {
                    return (
                      <Link
                        key={m.label}
                        className="body-l mb-[.625rem]"
                        href={m.path as MenuLink}
                        onClick={(e) => {
                          if (m.needPC) {
                            e.preventDefault();
                            setTipsModalOpenState(true);
                          } else {
                            toggleOpen();
                          }
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
        className="my-[1.5625rem] h-[1px] w-full bg-neutral-light-gray"
      ></motion.div>
      {children}
    </motion.div>
  );
};

export default NavList;
