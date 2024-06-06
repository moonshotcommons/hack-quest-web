'use client';
import { ChangeState } from '@/components/Common/ScrollContainer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MaxpaginationBoxWidth, paginationGap, paginationWidth } from '../data';

interface PaginationProp {
  changeState?: ChangeState;
  isMobile?: boolean;
}

const Pagination: React.FC<PaginationProp> = ({ changeState, isMobile = false }) => {
  const { rightArrowVisible, leftArrowVisible } = changeState || {};

  const [translateX, setTranslateX] = useState(0);
  const scrollBarInstanceRef = useRef<HTMLDivElement>(null);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [paginationNum, setPaginationNum] = useState(0);

  const paginatWidth = useMemo(() => {
    if (!changeState) return 0;
    const { containerWidth } = changeState;
    const maxBoxWidth = isMobile ? containerWidth : MaxpaginationBoxWidth;
    let w = (maxBoxWidth - paginationNum * paginationGap) / paginationNum;
    return w < paginationWidth ? w : paginationWidth;
  }, [paginationNum]);

  useEffect(() => {
    if (!changeState) return;
    const { containerWidth, listWidth, translateX } = changeState;
    if (containerWidth / listWidth) {
      setPaginationNum(Math.ceil(1 / (containerWidth / listWidth)));
    }
    setPaginationIndex(Math.ceil(-translateX / containerWidth));
  }, [changeState]);

  useEffect(() => {
    setTranslateX(paginatWidth * paginationIndex + paginationIndex * paginationGap);
  }, [paginationIndex, paginatWidth]);

  if (!leftArrowVisible && !rightArrowVisible) return null;
  return (
    <div className="flex h-[4px] w-full justify-center">
      <div className="relative flex h-full " style={{ gap: `${paginationGap}px` }}>
        {Array.from({ length: paginationNum }).map((_, i) => (
          <div
            key={i}
            className="h-full rounded-[4px] bg-neutral-light-gray"
            style={{ width: `${paginatWidth}px` }}
          ></div>
        ))}
        <div
          className="absolute bottom-0 left-0 h-full rounded-[4px] bg-yellow-dark transition-transform"
          ref={scrollBarInstanceRef}
          style={{
            width: `${paginatWidth}px`,
            transform: `translateX(${translateX}px)`
          }}
        ></div>
      </div>
    </div>
  );
};

export default Pagination;
