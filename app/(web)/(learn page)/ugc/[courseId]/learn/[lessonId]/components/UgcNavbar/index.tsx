'use client';
import React, { useContext } from 'react';
import { UgcContext } from '../../constants/type';

interface UgcNavbarProp {}

const UgcNavbar: React.FC<UgcNavbarProp> = () => {
  const { navbarData } = useContext(UgcContext);
  return (
    <div className="flex gap-[8px] body-s text-neutral-black absolute left-[20px] top-[30px]">
      {navbarData.map((v, i) => (
        <div key={i}>
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
