'use client';
import React, { useContext } from 'react';
import { LessonPageContext } from '../type';

interface LessonNavbarProp {}

const LessonNavbar: React.FC<LessonNavbarProp> = () => {
  const { navbarData } = useContext(LessonPageContext);
  return (
    <div className="flex gap-[8px] h-[1.25rem] mt-[1.25rem] body-s text-neutral-black bg-neutral-white px-[1.375rem]">
      {navbarData.map((v, i) => (
        <div key={i} className="max-w-[33.3%] truncate">
          {i ? <span className="pr-[.5rem]">/</span> : null}
          <span className={`${i === navbarData.length - 1 ? 'underline' : ''}`}>
            {v.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LessonNavbar;
