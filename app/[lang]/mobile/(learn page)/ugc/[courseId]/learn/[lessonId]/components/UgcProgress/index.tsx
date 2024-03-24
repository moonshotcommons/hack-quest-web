import { UgcContext } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import { useUnitNavList } from '@/hooks/courses/useUnitNavList';
import React, { useContext, useEffect } from 'react';

interface UgcProgressProp {}

const UgcProgress: React.FC<UgcProgressProp> = () => {
  const { lesson } = useContext(UgcContext);
  const { unitNavList = [], refreshNavList } = useUnitNavList(lesson);
  useEffect(() => {
    refreshNavList();
  }, [lesson]);
  return (
    <div className="flex h-[.3125rem] w-full gap-[1px]">
      {unitNavList.map((item) => (
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
