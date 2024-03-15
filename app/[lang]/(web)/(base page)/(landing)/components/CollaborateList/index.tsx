import Image from 'next/image';
import { FC } from 'react';

interface CollaborateListProps {}

const CollaborateList: FC<CollaborateListProps> = (props) => {
  return (
    <div className="relative h-[385px] w-full bg-neutral-off-white">
      <div className="container absolute left-1/2 top-0 mx-auto max-w-[1280px] -translate-x-1/2 rounded-[2rem] bg-neutral-white p-[3.75rem] ">
        <p className="body-l-bold text-center text-neutral-medium-gray">
          We collaborate with 100+ leading Web3 ecosystems and projects
        </p>
        <div className="relative mt-[1.5rem] h-[272px] w-full">
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
