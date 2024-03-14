import DropDownMotion from '@/components/Common/DropDownMotion';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useDebounceFn } from 'ahooks';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useShallow } from 'zustand/react/shallow';
import { inltData } from '../Navbar/data';
import { IntlEnum } from '../Navbar/type';

interface IntlProp {}

const Intl: React.FC<IntlProp> = () => {
  const [hoverFilter, setHoverFilter] = useState(false);
  const { intl, setIntl } = useGlobalStore(
    useShallow((state) => {
      return {
        intl: state?.intl,
        setIntl: state?.setIntl
      };
    })
  );
  const { run: mouseLeaveFilter } = useDebounceFn(
    () => {
      setHoverFilter(false);
    },
    { wait: 100 }
  );

  const changeIntl = (val: IntlEnum) => {
    setIntl(val);
  };
  return (
    <div
      className="button-text-s relative flex h-[34px] cursor-pointer items-center gap-[8px] rounded-[17px] bg-neutral-off-white px-[17px] text-neutral-black"
      onMouseEnter={() => {
        mouseLeaveFilter.cancel();
        setHoverFilter(true);
      }}
      onMouseLeave={mouseLeaveFilter}
    >
      {intl}
      <span>
        <FiChevronDown size={24} />
      </span>
      <DropDownMotion
        open={hoverFilter}
        className={
          'body-s-bold -right-[15px] whitespace-nowrap rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[12px] text-neutral-rich-gray shadow-[0_2px_2px_0_rgba(19,19,19,0.15)]'
        }
      >
        {inltData.map((v) => (
          <div
            key={v.value}
            onClick={() => changeIntl(v.value)}
            className={`mb-[8px] cursor-pointer rounded-[8px] p-[12px] hover:bg-neutral-off-white ${intl === v.value ? 'bg-neutral-off-white' : ''}`}
          >
            {v.label}
          </div>
        ))}
      </DropDownMotion>
    </div>
  );
};

export default Intl;
