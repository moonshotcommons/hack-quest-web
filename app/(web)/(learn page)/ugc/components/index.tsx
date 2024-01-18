import React from 'react';

import UgcFooter from './UgcFooter';
import UgcProvider from './UgcProvider';
import UgcSidebar from './UgcSidebar';
import UgcNavbar from './UgcNavbar';

interface UgcProp {}

const Ugc: React.FC<UgcProp> = () => {
  return (
    <UgcProvider>
      <div className="h-full flex flex-col">
        <div className="w-full flex-1 flex overflow-hidden">
          <UgcSidebar />
          <div className="flex-1 bg-neutral-white flex justify-center relative">
            <UgcNavbar />
            <div className="w-[50.5rem] bg-slate-800"></div>
          </div>
        </div>
        <UgcFooter />
      </div>
    </UgcProvider>
  );
};

export default Ugc;
