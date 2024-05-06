'use client';
import { cn } from '@/helper/utils';
import { DocsItem } from '@/service/webApi/helper/type';
import { FC, ReactNode, useState } from 'react';

interface ExpandWrapProps {
  doc: DocsItem;
  children: ReactNode;
  selectAlias: string;
}

const ExpandWrap: FC<ExpandWrapProps> = ({ children, doc, selectAlias }) => {
  const [expand, setExpand] = useState(
    !!doc.children.find((child) => {
      if (child.alias === selectAlias) return true;
      if (child.children) return child.children.find((item) => item.alias);
      return false;
    })
  );

  return (
    <div>
      <div
        className="body-xl-bold flex cursor-pointer justify-between pl-10 pr-5 text-neutral-black"
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <span>{doc.title}</span>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={!expand ? 'rotate-180' : ''}
        >
          <path
            d="M21.7505 17.1597C21.3857 17.5734 20.7549 17.6137 20.3405 17.2497L12.0005 9.83971L3.66049 17.2497C3.24357 17.5855 2.63615 17.5334 2.28249 17.1315C1.92884 16.7297 1.9544 16.1205 2.34049 15.7497L11.3405 7.74971C11.718 7.41807 12.283 7.41807 12.6605 7.74971L21.6605 15.7497C22.0742 16.1145 22.1145 16.7453 21.7505 17.1597Z"
            fill="#0B0B0B"
          />
        </svg>
      </div>
      <div className={cn('mt-3', expand ? 'block' : 'hidden')}>{children}</div>
      <div className="my-6 w-full pl-10 pr-5">
        <div className="h-[1px] w-full scale-y-50 bg-neutral-medium-gray" />
      </div>
    </div>
  );
};

export default ExpandWrap;
