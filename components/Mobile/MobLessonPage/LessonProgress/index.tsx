import { useUnitNavList } from '@/hooks/useUnitNavList';
import React, { useEffect } from 'react';
import { CourseLessonType } from '@/service/webApi/course/type';

interface LessonProgressProp {
  lesson: CourseLessonType;
}

const LessonProgress: React.FC<LessonProgressProp> = ({ lesson }) => {
  const { unitNavList = [], refreshNavList } = useUnitNavList(lesson);
  useEffect(() => {
    refreshNavList();
  }, [lesson]);
  return (
    <div className="flex h-[.3125rem] w-full gap-[1px] ">
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

export default LessonProgress;
