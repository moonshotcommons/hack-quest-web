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
  const [pageSearch, setPageSearch] = useState('');
  const onPageInputValueChange = (value: any) => {
    if (isNaN(value) || value === '') {
      setCurrentPage(props.page);
      return;
    }
    let page = Number(value);
    if (page > total) page = total;
    if (page < 1) page = 1;

    if (urlPrefix) {
      router.push(`${urlPrefix}${page}${pageSearch}`);
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
    if (urlPrefix) {
      setPageSearch(new URL(window.location.href).search || '');
    }
    setCurrentPage(page);
  }, [page]);

  return (
    <div className="flex items-center gap-x-[50px]">
      {urlPrefix ? (
        <Link
          href={`${urlPrefix}${page <= 1 ? 1 : page - 1}${pageSearch}`}
          onClick={(e) => {
            if (page <= 1) {
              e.preventDefault();
            }
          }}
        >
          <div
            className={cn(
              `flex scale-[0.835] cursor-pointer items-center justify-center rounded-full border border-solid border-[#000000] bg-[#000000] p-2 text-neutral-white`,
              page <= 1
                ? 'cursor-not-allowed bg-transparent text-neutral-black'
                : 'transition hover:border-[#000000]/70 hover:bg-[#000000]/70'
            )}
          >
            <HiArrowLongLeft size={24}></HiArrowLongLeft>
          </div>
        </Link>
      ) : (
        <div
          className={cn(
            `flex scale-[0.835] cursor-pointer items-center justify-center rounded-full border border-solid border-[#000000] bg-[#000000] p-2 text-neutral-white`,
            page <= 1
              ? 'cursor-not-allowed bg-transparent text-neutral-black'
              : 'transition hover:border-[#000000]/70 hover:bg-[#000000]/70'
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

      <div className="body-xl text-neutral-black">
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
          className="w-[26px] appearance-none bg-transparent text-center underline outline-none"
        />
        <span>{`of ${total}`}</span>
      </div>

      {urlPrefix ? (
        <Link
          href={`${urlPrefix}${page >= total ? page : page + 1}${pageSearch}`}
        >
          <div
            className={cn(
              `flex scale-[0.835] cursor-pointer items-center justify-center rounded-full border border-solid border-[#000000] bg-[#000000] p-2 text-neutral-white`,
              page >= total
                ? 'cursor-not-allowed bg-transparent text-neutral-black'
                : 'transition hover:border-[#000000]/70 hover:bg-[#000000]/70'
            )}
          >
            <HiArrowLongRight size={24}></HiArrowLongRight>
          </div>
        </Link>
      ) : (
        <div
          className={cn(
            `flex scale-[0.835] cursor-pointer items-center justify-center rounded-full border border-solid border-[#000000] bg-[#000000] p-2 text-neutral-white`,
            page >= total
              ? 'cursor-not-allowed bg-transparent text-neutral-black'
              : 'transition hover:border-[#000000]/70 hover:bg-[#000000]/70'
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
