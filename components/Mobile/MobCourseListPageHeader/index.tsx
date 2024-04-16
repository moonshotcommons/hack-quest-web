'use client';
import { LangContext } from '@/components/Provider/Lang';
import { cn } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { GoX } from 'react-icons/go';

interface CourseListPageHeaderProps {
  title: string;
  description?: string;
  coverImage?: ReactNode;
  coverImageUrl?: string | StaticImport;
  coverWidth?: number;
  coverHeight?: number;
  onSearch?: (value: string) => void;
  buttonNode?: ReactNode;
  className?: string;
  coverImgClassName?: string;
  defaultValue?: string;
  // onSearchInput:
}

const MobCourseListPageHeader: FC<CourseListPageHeaderProps> = ({
  title,
  description,
  coverImage,
  coverImageUrl,
  coverWidth,
  coverHeight,
  onSearch,
  buttonNode,
  className,
  coverImgClassName,
  defaultValue = ''
}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const [searchValue, setSearchValue] = useState('');
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setSearchValue(defaultValue);
  }, [defaultValue]);
  return (
    <div className={cn('relative min-h-[18rem] bg-yellow-primary px-[1.25rem] pb-[5.625rem]', className)}>
      <div className="pt-[7.5rem]">
        <h1 className="text-h1-mob text-neutral-black">{title}</h1>
        {description ? <div className="bdy-m mt-[1rem] text-neutral-rich-gray">{description}</div> : null}
        {buttonNode ? <div className="mt-[2.5rem]">{buttonNode}</div> : null}
        {onSearch ? (
          <div className="mt-[1.25rem] flex w-full items-center gap-3 rounded-[3.5rem] border border-neutral-light-gray bg-neutral-white px-3 py-2">
            <span>
              <FiSearch size={20} />
            </span>
            <input
              placeholder={t('searchPlaceholder')}
              className="body-m w-full truncate text-neutral-medium-gray outline-none"
              value={searchValue}
              // onKeyUp={(e) => {
              //   if (e.code === 'Enter') {
              //     const value = (e.target as HTMLInputElement).value;
              //     setSearchValue(value);
              //     onSearch(value);
              //   }
              // }}
              // onChange={(e) => {
              //   setSearchValue(e.target.value);
              //   if (!e.target.value) onSearch(e.target.value);
              // }}
              // onBlur={(e) => {
              //   setSearchValue(e.target.value);
              //   onSearch(e.target.value);
              // }}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setSearchValue(value);
                if (timeOut.current) clearTimeout(timeOut.current);
                timeOut.current = setTimeout(() => {
                  onSearch(value);
                }, 1000);
              }}
            ></input>

            {!!searchValue && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  setSearchValue('');
                  onSearch('');
                }}
              >
                <GoX size={22}></GoX>
              </span>
            )}
          </div>
        ) : null}
      </div>
      <div className={cn('absolute right-0 top-0', coverImgClassName)}>
        {coverImage}
        {!coverImage && coverImageUrl && (
          <Image src={coverImageUrl} alt={`${title} cover`} width={coverWidth} height={coverHeight} priority></Image>
        )}
      </div>
    </div>
  );
};

export default MobCourseListPageHeader;
