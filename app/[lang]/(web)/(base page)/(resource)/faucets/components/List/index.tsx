import { FaucetType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import FaucetCard from '../FaucetCard';

interface ListProp {
  list: FaucetType[];
}

const List: React.FC<ListProp> = ({ list }) => {
  return (
    <div className="flex flex-wrap gap-x-[20px] gap-y-[40px] pt-[40px]">
      {Array.from({ length: 20 }).map((faucet, i) => (
        <div key={i} className="w-[calc((100%-60px)/4)]">
          <FaucetCard faucet={faucet} />
        </div>
      ))}
    </div>
  );
};

export default List;
