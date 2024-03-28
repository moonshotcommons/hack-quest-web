import React from 'react';
import { titleTxtData } from '../../constants/data';

interface DemoVideoProp {}

const DemoVideo: React.FC<DemoVideoProp> = () => {
  return (
    <div>
      <p className="text-h3 text-neutral-off-black">{titleTxtData[4]}</p>
      <video controls className="mt-[24px] w-full">
        {/* <source src={project.video}></source> */}
      </video>
      <p className="caption-14pt mt-[12px] text-center text-neutral-rich-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
  );
};

export default DemoVideo;
