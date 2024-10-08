import { FaucetType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import FaucetCard from '../FaucetCard';

interface ListProp {
  list: FaucetType[];
}

const List: React.FC<ListProp> = ({ list }) => {
  return (
    <div className="flex flex-wrap items-stretch gap-x-[20px] gap-y-[40px] py-[40px]">
      {list.map((faucet, i) => (
        <div key={i} className="w-[calc((100%-60px)/4)]">
          <FaucetCard faucet={faucet} />
        </div>
      ))}
    </div>
  );
};

export default List;
