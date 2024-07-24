'use client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useDebounceFn } from 'ahooks';
import React, { useContext, useEffect, useState } from 'react';
import { PiSortAscendingBold } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/client';
import { animateProps } from './data';
import { GoCheck } from 'react-icons/go';
import { SortOptionType } from './type';

interface SortByProp {
  sorts: SortOptionType[];
  curSort: string;
  updateSort: (sort: string) => void;
}

const SortBy: React.FC<SortByProp> = ({ sorts, updateSort, curSort: cur }) => {
  const [hoverSort, setHoverSort] = useState<boolean>(false);
  const [curSort, setCurSort] = useState('');
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  const { run: mouseLeaveSort } = useDebounceFn(
    () => {
      setHoverSort(false);
    },
    { wait: 100 }
  );
  useEffect(() => {
    setCurSort(cur);
  }, [cur]);
  return (
    <div
      className="relative h-fit"
      onMouseEnter={() => {
        mouseLeaveSort.cancel();
        setHoverSort(true);
      }}
      onMouseLeave={mouseLeaveSort}
    >
      <div className="relative flex cursor-pointer items-center gap-[10px] px-3 py-[10px]">
        <span>
          <PiSortAscendingBold size={32} />
        </span>
        <span className="body-l text-neutral-off-black">{t('courses.sortBy')}</span>
      </div>
      {hoverSort && (
        <motion.ul
          {...animateProps}
          className="absolute -bottom-[4px]  left-[-10px] z-[99] w-fit min-w-[160px] rounded-[10px] border border-neutral-light-gray bg-neutral-white py-4 shadow-sm"
        >
          {sorts.map((option) => {
            return (
              <li
                key={option.value}
                className="body-m flex cursor-pointer items-center justify-between px-3 py-2 text-neutral-black hover:bg-yellow-light"
                onClick={() => {
                  updateSort(option.value);
                }}
              >
                <span>{t(option.label)}</span>
                {option.value === curSort && (
                  <span>
                    <GoCheck size={20} />
                  </span>
                )}
              </li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
};

export default SortBy;
