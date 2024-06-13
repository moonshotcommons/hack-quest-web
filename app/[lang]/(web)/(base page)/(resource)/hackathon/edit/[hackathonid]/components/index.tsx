'use client';
import React, { useState } from 'react';
import EditProvider from './EditProvider';
import EditNav from './EditNav.tsx';
import Info from './Info';

interface HackathonEditProp {}

const HackathonEdit: React.FC<HackathonEditProp> = () => {
  const [curTab, setCurTab] = useState('');
  return (
    <EditProvider>
      <div className="scroll-wrap-y h-full ">
        <div className="container relative mx-auto pt-[40px]">
          <EditNav curTab={curTab} setCurTab={setCurTab} />
          <div className="relative flex justify-between pt-[60px]">
            <div className="flex h-[2000px] w-[58%] flex-col gap-[60px] [&>div]:w-full"></div>
            <div className="relative w-[39%]">
              <Info />
            </div>
          </div>
        </div>
      </div>
    </EditProvider>
  );
};

export default HackathonEdit;
