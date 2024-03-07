'use client';
import { UgcContext } from '@/app/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import React, { useContext } from 'react';

interface UgcNavbarProp {}

const UgcNavbar: React.FC<UgcNavbarProp> = () => {
  const { navbarData } = useContext(UgcContext);
  return (
    <div className="body-s flex h-[1.25rem] gap-[8px] bg-neutral-white px-[1.375rem] text-neutral-black">
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

export default UgcNavbar;
