'use client';
import React, { useContext } from 'react';
import { LessonPageContext } from '../type';

interface UgcNavbarProp {}

const UgcNavbar: React.FC<UgcNavbarProp> = () => {
  const { navbarData } = useContext(LessonPageContext);
  console.info(navbarData, 1111111);
  return (
    <div className="body-s flex h-[50px] items-center text-neutral-off-black">
      {navbarData.map((v, i) => (
        <div key={i} className="max-w-[31%] truncate">
          {i ? <span className="pr-[8px]">/</span> : null}
          <span className={`${i === navbarData.length - 1 ? 'underline' : ''}`}>
            {v.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UgcNavbar;
