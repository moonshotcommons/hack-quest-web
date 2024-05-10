import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SpType } from '../../constants/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { IoIosArrowUp } from 'react-icons/io';

interface SpcardProp {
  info: SpType;
  handleShowMore: VoidFunction;
}

const Spcard: React.FC<SpcardProp> = ({ info, handleShowMore }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  const descRef = useRef<HTMLDivElement>(null);
  const [isShowMore, setIsShowMore] = useState(false);
  const [lineClamp, setLineClamp] = useState(false);
  useEffect(() => {
    const height = descRef.current?.offsetHeight || 0;
    setIsShowMore(height > 127);
    setLineClamp(height > 77);
  }, []);
  return (
    <div className="flex gap-[16px] overflow-hidden text-neutral-off-black">
      <div className="relative h-[153px] w-[153px] flex-shrink-0">
        <Image src={info.img} fill alt={info.name} className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="relative w-full">
          <h2 className="body-m-bold">{info.name}</h2>
          <p
            className={`body-xs text-neutral-rich-gray ${isShowMore && lineClamp && !info.showMore && 'line-clamp-4'} `}
          >
            {info.description}
          </p>
          <p className="body-xs absolute z-[0] w-full opacity-0" ref={descRef}>
            {info.description}
          </p>
        </div>
        {isShowMore && (
          <div className="body-xs relative z-[1] flex w-full justify-end pt-[14px]">
            <div className="flex cursor-pointer items-center gap-[4px]" onClick={handleShowMore}>
              <span>{info.showMore ? t('readLess') : t('readMore')}</span>
              <IoIosArrowUp className={`transition-all ${info.showMore ? '' : 'rotate-[180deg]'}`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spcard;
