'use client';
import DropDownMotion from '@/components/Common/DropDownMotion';
import { useDebounceFn } from 'ahooks';
import React, { useMemo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { inltData as orgInltData } from '../Navbar/data';
import Link from 'next/link';
import { Lang } from '@/i18n/config';
import { usePathname } from 'next/navigation';
import { getLang, useTranslation } from '@/i18n/client';

interface IntlProp {}

const Intl: React.FC<IntlProp> = () => {
  const [hoverFilter, setHoverFilter] = useState(false);
  const orgPathname = usePathname();
  const lang = getLang();
  const { t } = useTranslation(lang);
  const { run: mouseLeaveFilter } = useDebounceFn(
    () => {
      setHoverFilter(false);
    },
    { wait: 100 }
  );

  const { inltData, pathname, inltVal } = useMemo(() => {
    let inltData = orgInltData;
    if (!orgPathname.includes('/launch-pool')) {
      inltData = orgInltData.filter((item) => item.value === Lang.EN);
    }

    const pathname = orgPathname.replace(`/${lang}`, '');

    const inltVal = inltData.find((item) => item.value === lang);

    return { inltData, pathname, inltVal };
  }, [orgPathname, lang]);

  return (
    <div
      className="button-text-s relative flex h-[34px] w-[120px] cursor-pointer items-center justify-between gap-[8px] rounded-[17px] bg-neutral-off-white px-[17px] text-neutral-black"
      onMouseEnter={() => {
        mouseLeaveFilter.cancel();
        setHoverFilter(true);
      }}
      onMouseLeave={mouseLeaveFilter}
    >
      {inltVal?.label}
      <span>
        <FiChevronDown size={20} />
      </span>
      <DropDownMotion
        open={hoverFilter}
        className={
          'body-s-bold -right-[15px] whitespace-nowrap rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[12px] text-neutral-rich-gray shadow-[0_2px_2px_0_rgba(19,19,19,0.15)]'
        }
      >
        {inltData.map((v) => (
          <Link
            href={`/${v.value}${pathname}`}
            key={v.value}
            onClick={(e) => {
              if (v.value === lang) {
                e.preventDefault();
              }
            }}
            className={`mb-[8px] block cursor-pointer rounded-[8px] p-[12px] hover:bg-neutral-off-white ${lang === v.value ? 'bg-neutral-off-white' : ''}`}
          >
            {v.label}
          </Link>
        ))}
      </DropDownMotion>
    </div>
  );
};

export default Intl;
