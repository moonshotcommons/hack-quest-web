'use client';

import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';
import { cn } from '@/helper/utils';
import { useKeyPress } from 'ahooks';
import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { noop } from 'lodash-es';

interface PaginationProps {
  total: number;
  page: number;
  onPageChange?: (page: number) => void;
  urlPrefix?: string;
}

const Pagination: FC<PaginationProps> = (props) => {
  const router = useRouter();
  const { page, total, onPageChange = noop, urlPrefix } = props;
  const [currentPage, setCurrentPage] = useState<any>(page);
  const pageInputRef = useRef<HTMLInputElement>(null);

  const onPageInputValueChange = (value: any) => {
    if (isNaN(value) || value === '') {
      setCurrentPage(props.page);
      return;
    }
    let page = Number(value);
    if (page > total) page = total;
    if (page < 1) page = 1;

    if (urlPrefix) {
      router.push(`${urlPrefix}${page}`);
    } else {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  useKeyPress('enter', () => {
    if (!pageInputRef.current) return;
    const value = pageInputRef.current.value as any;
    onPageInputValueChange(value);
  });

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div className="flex gap-x-[50px] items-center">
      {urlPrefix ? (
        <Link
          className={cn(
            `flex items-center justify-center p-2 rounded-full border border-solid border-[#000000] bg-[#000000] text-white cursor-pointer scale-[0.835]`,
            page <= 1
              ? 'bg-transparent text-black cursor-not-allowed'
              : 'hover:bg-[#000000]/70 hover:border-[#000000]/70 transition'
          )}
          href={`${urlPrefix}${page - 1}`}
        >
          <HiArrowLongLeft size={24}></HiArrowLongLeft>
        </Link>
      ) : (
        <div
          className={cn(
            `flex items-center justify-center p-2 rounded-full border border-solid border-[#000000] bg-[#000000] text-white cursor-pointer scale-[0.835]`,
            page <= 1
              ? 'bg-transparent text-black cursor-not-allowed'
              : 'hover:bg-[#000000]/70 hover:border-[#000000]/70 transition'
          )}
          onClick={() => {
            if (page <= 1) return;
            let decrementPage = page - 1;
            if (decrementPage < 1) decrementPage = 1;
            setCurrentPage(decrementPage);
            onPageChange(decrementPage);
          }}
        >
          <HiArrowLongLeft size={24}></HiArrowLongLeft>
        </div>
      )}

      <div className="font-next-book text-[24px] text-[#0b0b0b] leading-[160%] tracking-[0.48px]">
        <span>Page</span>
        <input
          type="text"
          ref={pageInputRef}
          onChange={(e) => {
            setCurrentPage(e.target.value);
          }}
          onBlur={(e) => {
            const value = e.target.value as any;
            onPageInputValueChange(value);
          }}
          value={currentPage}
          className="bg-transparent outline-none appearance-none text-center w-[26px] underline"
        />
        <span>{`of ${total}`}</span>
      </div>

      {urlPrefix ? (
        <Link
          className={cn(
            `flex items-center justify-center p-2 rounded-full border border-solid border-[#000000] bg-[#000000] text-white cursor-pointer scale-[0.835]`,
            page >= total
              ? 'bg-transparent text-black cursor-not-allowed'
              : 'hover:bg-[#000000]/70 hover:border-[#000000]/70 transition'
          )}
          href={`${urlPrefix}${page + 1}`}
        >
          <HiArrowLongRight size={24}></HiArrowLongRight>
        </Link>
      ) : (
        <div
          className={cn(
            `flex items-center justify-center p-2 rounded-full border border-solid border-[#000000] bg-[#000000] text-white cursor-pointer scale-[0.835]`,
            page >= total
              ? 'bg-transparent text-black cursor-not-allowed'
              : 'hover:bg-[#000000]/70 hover:border-[#000000]/70 transition'
          )}
          onClick={() => {
            if (page >= total) return;
            let incrementPage = page + 1;
            if (incrementPage > total) incrementPage = total;
            setCurrentPage(incrementPage);
            onPageChange(incrementPage);
          }}
        >
          <HiArrowLongRight size={24}></HiArrowLongRight>
        </div>
      )}
    </div>
  );
};

export default Pagination;
