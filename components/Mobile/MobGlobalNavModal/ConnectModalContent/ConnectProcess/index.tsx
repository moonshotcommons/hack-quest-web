import { FC, useMemo, useState } from 'react';
import { ConnectType, connectKeyMap } from '../constant';
import { cn } from '@/helper/utils';
interface ConnectProgressProps {
  connectType: ConnectType;
}

const ConnectProgress: FC<ConnectProgressProps> = ({ connectType }) => {
  const [connectState, setConnectState] = useState(connectKeyMap);
  console.log(connectType);
  const connectIndex = useMemo(() => {
    return connectKeyMap.findIndex((item) => item.key === connectType);
  }, [connectType]);
  console.log(connectIndex);
  return (
    <div className="flex gap-6">
      {connectKeyMap.map((item, index) => {
        return (
          <div
            key={item.key}
            className="body-l-bold flex w-[200px] flex-col gap-2"
          >
            <div
              className={cn(
                `h-[6px] w-full rounded-full`,
                index <= connectIndex
                  ? 'bg-yellow-dark'
                  : 'bg-neutral-light-gray'
              )}
            ></div>
            <span
              className={cn(
                index <= connectIndex
                  ? 'text-neutral-rich-gray'
                  : 'text-neutral-light-gray'
              )}
            >{`${index + 1} ${item.label}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectProgress;
