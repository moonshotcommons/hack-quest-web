import { FaucetType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import FaucetCard from '../FaucetCard';

interface ListProp {
  list: FaucetType[];
}

const List: React.FC<ListProp> = ({ list }) => {
  return (
    <div className="flex flex-col gap-[1.25rem] pt-[1.25rem]">
      {list.map((faucet) => (
        <div key={faucet.id} className="w-full">
          <FaucetCard faucet={faucet} />
        </div>
      ))}
    </div>
  );
};

export default List;
