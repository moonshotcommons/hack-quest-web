import { useUnitNavList } from '@/hooks/useUnitNavList';
import React, { useContext, useEffect } from 'react';
import { UgcContext } from '@/app/mobile/(learn page)/ugc/[courseId]/learn/constants/type';

interface UgcProgressProp {}

const UgcProgress: React.FC<UgcProgressProp> = () => {
  const { lesson } = useContext(UgcContext);
  const { unitNavList = [], refreshNavList } = useUnitNavList(lesson);
  useEffect(() => {
    refreshNavList();
  }, [lesson]);
  return (
    <div className="flex h-[.3125rem] w-full gap-[1px]">
      {unitNavList.map((item, i) => (
        <div className="h-full flex-1 bg-neutral-light-gray" key={item.id}>
          <div
            className="h-full  bg-yellow-dark transition-all"
            style={{ width: `${item.progress * 100}%` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default UgcProgress;
