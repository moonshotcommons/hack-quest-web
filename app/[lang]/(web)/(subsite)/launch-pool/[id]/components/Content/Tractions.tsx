import React from 'react';
import { titleTxtData } from '../../constants/data';

interface TractionsProp {}

const Tractions: React.FC<TractionsProp> = () => {
  return (
    <div className="mt-[120px]">
      <p className="text-h3 text-neutral-off-black">{titleTxtData[6]}</p>
      <ul className="body-xl w-full list-disc pl-[20px] text-neutral-off-black [&>li]:mt-[24px]">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
      </ul>
    </div>
  );
};

export default Tractions;
