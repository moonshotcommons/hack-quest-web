import Image from 'next/image';
import { FC } from 'react';

interface CollaborateListProps {}

const CollaborateList: FC<CollaborateListProps> = (props) => {
  return (
    <div className="w-full h-[40.875rem] py-10 bg-neutral-white relative">
      <p className="text-center body-l-bold text-neutral-medium-gray text-[12px] px-[7rem]">
        We collaborate with 100+ leading Web3 ecosystems and projects
      </p>
      <div className="mt-[1.5rem] w-full h-[516px] relative">
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
