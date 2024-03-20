'use client';
import React, { useRef, useState } from 'react';
import Nav from './Nav';
import Content from './Content';

interface LaunchDetailPageProp {}

const LaunchDetailPage: React.FC<LaunchDetailPageProp> = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const [anchorOffsetTops, setAnchorOffsetTops] = useState<number[]>([]);
  const isOnScoll = useRef(false);
  const handleClickAnchor = (index: number) => {
    setCurAnchorIndex(index);
    isOnScoll.current = true;
    boxRef.current?.scrollTo({
      top: anchorOffsetTops[index] - 40,
      behavior: 'smooth'
    });
    setTimeout(() => {
      isOnScoll.current = false;
    }, 1000);
  };
  const handleScoll = () => {
    if (isOnScoll.current) return;
    const scrollTop = boxRef.current?.scrollTop || 0;
    for (let i = 0; i < anchorOffsetTops.length; i++) {
      if (scrollTop >= anchorOffsetTops[anchorOffsetTops.length - 1] - 40) {
        setCurAnchorIndex(anchorOffsetTops.length - 1);
        break;
      } else if (
        scrollTop >= anchorOffsetTops[i] - 40 &&
        scrollTop < anchorOffsetTops[i + 1] - 40
      ) {
        setCurAnchorIndex(i);
        break;
      }
    }
  };
  return (
    <div
      className="scroll-wrap-y h-full py-[40px]"
      ref={boxRef}
      onScroll={handleScoll}
    >
      <div className="container  mx-auto flex">
        <div className="relative w-[345px]">
          <Nav
            curAnchorIndex={curAnchorIndex}
            handleClickAnchor={handleClickAnchor}
          />
        </div>
        <Content setAllTops={(tops) => setAnchorOffsetTops(tops)} />
      </div>
    </div>
  );
};

export default LaunchDetailPage;
