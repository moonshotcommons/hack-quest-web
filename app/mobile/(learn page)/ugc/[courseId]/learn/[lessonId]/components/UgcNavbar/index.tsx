'use client';
import React, { useContext } from 'react';
import { UgcContext } from '@/app/mobile/(learn page)/ugc/[courseId]/learn/constants/type';

interface UgcNavbarProp {}

const UgcNavbar: React.FC<UgcNavbarProp> = () => {
  const { navbarData } = useContext(UgcContext);
  return (
    <div className="flex gap-[8px] body-s text-neutral-black bg-neutral-white">
      {navbarData.map((v, i) => (
        <div key={i} className="max-w-[33.3%]">
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
