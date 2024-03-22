import { FC, useMemo, useState, useContext } from 'react';
import { ConnectType, connectKeyMap } from '../constant';
import { cn } from '@/helper/utils';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
interface ConnectProgressProps {
  connectType: ConnectType;
}

const ConnectProgress: FC<ConnectProgressProps> = ({ connectType }) => {
  const [connectState, setConnectState] = useState(connectKeyMap);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const connectIndex = useMemo(() => {
    return connectKeyMap.findIndex((item) => item.key === connectType);
  }, [connectType]);
  return (
    <div className="flex gap-[10px]">
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
            >{`${index + 1} ${t(item.label)}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectProgress;
