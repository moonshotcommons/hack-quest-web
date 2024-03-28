import { ReactNode, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
interface MobViewMoreListProps<T> {
  list: T[];
  limit: number;
  renderItem: (item: T) => ReactNode;
}

const MobViewMoreList = <T,>({ list: propList, limit, renderItem }: MobViewMoreListProps<T>) => {
  const [originList, setOriginList] = useState<T[]>([]);
  const [list, setList] = useState<T[]>([]);

  useEffect(() => {
    const tempOriginList = [...propList];
    const pushList = tempOriginList.splice(0, limit);
    setList(pushList);
    setOriginList(tempOriginList);
  }, [propList, limit]);

  return (
    <div className="flex w-full flex-col gap-5">
      {list.map((item, index) => {
        return (
          <div key={index} className="w-full">
            {renderItem(item)}
          </div>
        );
      })}
      {!!originList.length && (
        <div
          className="body-s flex items-center gap-[.375rem]"
          onClick={() => {
            const tempOriginList = [...originList];
            const pushList = tempOriginList.splice(0, limit);
            setList(list.concat(pushList));
            setOriginList(tempOriginList);
          }}
        >
          <span>View more</span>
          <span>
            <FiChevronDown size={20} />
          </span>
        </div>
      )}
    </div>
  );
};

export default MobViewMoreList;
