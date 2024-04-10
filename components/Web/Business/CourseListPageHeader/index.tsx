'use client';
import { cn } from '@/helper/utils';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { GoX } from 'react-icons/go';
interface CourseListPageHeaderProps {
  title: string;
  description: string;
  coverImage?: ReactNode;
  coverImageUrl?: string | StaticImport;
  coverWidth?: number;
  coverHeight?: number;
  onSearch?: (value: string) => void;
  coverImgClassName?: string;
  className?: string;
  buttonNode?: ReactNode;
  defaultValue?: string;
  delay?: number;
  placeholder?: string;
}

const CourseListPageHeader: FC<CourseListPageHeaderProps> = ({
  title,
  description,
  coverImage,
  coverImageUrl,
  coverWidth,
  coverHeight,
  onSearch,
  coverImgClassName = '',
  className = '',
  buttonNode,
  defaultValue = '',
  delay = 1000,
  placeholder = ''
}) => {
  const [searchValue, setSearchValue] = useState('');
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setSearchValue(defaultValue);
  }, [defaultValue]);
  return (
    <div className={cn('relative flex min-h-[360px] justify-between gap-[36px] pb-[90px]', className)}>
      <div className="w-[800px] max-w-[800px] pt-[60px]">
        <h1 className="text-h2 text-neutral-black">{title}</h1>
        <p className="body-l mt-[20px] text-neutral-rich-gray">{description}</p>
        {buttonNode && <div className="mt-[20px]">{buttonNode}</div>}
        {onSearch && (
          <div className="mt-[60px] flex w-full items-center gap-5 rounded-[56px] border border-neutral-light-gray bg-neutral-white px-5 py-4">
            <span>
              <FiSearch size={20} />
            </span>
            <input
              placeholder={placeholder}
              className="body-l w-full truncate text-neutral-medium-gray outline-none"
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
              //   onSearch(e.target.value);
              // }}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setSearchValue(value);
                if (timeOut.current) clearTimeout(timeOut.current);
                timeOut.current = setTimeout(() => {
                  onSearch(value);
                }, delay);
              }}
              // onBlur={(e) => {
              //   setSearchValue(e.target.value);
              //   onSearch(e.target.value);
              // }}
            ></input>
            {!!searchValue && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  setSearchValue('');
                  onSearch('');
                }}
              >
                <GoX size={28}></GoX>
              </span>
            )}
          </div>
        )}
      </div>
      <div className={coverImgClassName}>
        {coverImage}
        {!coverImage && coverImageUrl && (
          <Image src={coverImageUrl} alt={`${title} cover`} width={coverWidth} height={coverHeight}></Image>
        )}
      </div>
    </div>
  );
};

export default CourseListPageHeader;
