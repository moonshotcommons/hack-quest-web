import Image from 'next/image';
import { FC } from 'react';

interface CollaborateListProps {}

const CollaborateList: FC<CollaborateListProps> = (props) => {
  return (
    <div className="w-full h-[385px] bg-neutral-off-white relative">
      <div className="absolute top-0 container p-[3.75rem] left-1/2 -translate-x-1/2 bg-neutral-white rounded-[2rem] ">
        <p className="text-center body-l-bold text-neutral-medium-gray">
          We collaborate with 100+ leading Web3 ecosystems and projects
        </p>
        <div className="mt-[1.5rem] w-full h-[272px] relative">
          <Image
            src={'/images/landing/cooperation_list.png'}
            alt="cooperation"
            fill
            className="object-contain"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default CollaborateList;
