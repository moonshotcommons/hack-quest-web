import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { RiShareBoxLine } from 'react-icons/ri';

interface ListProp {}

const List: React.FC<ListProp> = () => {
  return (
    <div className="w-full rounded-[8px] border border-neutral-light-gray p-[16px]">
      <div className="headline-h4 mb-[16px] flex gap-[40px] text-neutral-rich-gray [&>div]:flex-1 [&>div]:flex-shrink-0">
        <div>Transaction</div>
        <div>Timestamp</div>
      </div>
      <div className="body-l flex flex-col gap-[16px] border-t border-neutral-light-gray pt-[16px] text-neutral-black">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className='[&>div]:flex-shrink-0" flex w-full  gap-[40px] [&>div]:flex-1'>
            <div>
              <Link href={'111'} className="flex items-center gap-[12px]">
                <span>View on explorer</span>
                <RiShareBoxLine />
              </Link>
            </div>
            <div>{dayjs(new Date()).format('MMM D,YY hh:mm:ss A')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
