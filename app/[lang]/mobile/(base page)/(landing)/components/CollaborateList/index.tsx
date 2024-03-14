import Image from 'next/image';
import { FC } from 'react';

interface CollaborateListProps {}

const CollaborateList: FC<CollaborateListProps> = (props) => {
  return (
    <div className="relative h-[40.875rem] w-full bg-neutral-white py-10">
      <p className="body-l-bold body-xs px-[7rem] text-center text-neutral-medium-gray">
        We collaborate with 100+ leading Web3 ecosystems and projects
      </p>
      <div className="relative mt-[1.5rem] h-[516px] w-full">
        <Image
          src={'/images/landing/cooperation_list_mobile.png'}
          alt="cooperation"
          fill
          className="object-contain"
        ></Image>
      </div>
    </div>
  );
};

export default CollaborateList;
