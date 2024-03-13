import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { LessonMenuType, UnitMenuType } from '../../constant/type';
import { useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';
import webApi from '@/service';

interface DropLessonProp {
  unitList: UnitMenuType[];
  children: ReactNode;
  unitIndex: number;
  lessonIndex: number;
  refreshUnit: VoidFunction;
}

const DropLesson: React.FC<DropLessonProp> = ({
  unitList,
  children,
  unitIndex,
  lessonIndex: targetIndex,
  refreshUnit
}) => {
  const { setLoading } = useUgcCreationStore(
    useShallow((state) => ({
      setLoading: state.setLoading
    }))
  );
  const [{}, drop] = useDrop(
    () => ({
      accept: unitList[unitIndex].pages?.map((v) => v.id),
      drop: (item: LessonMenuType) => {
        const curIndex = unitList[unitIndex].pages.findIndex(
          (v) => v.id === item.id
        );
        setLoading(true);
        webApi.ugcCreateApi
          .sortLesson(item.id, {
            from: curIndex,
            to: targetIndex
          })
          .then(() => {
            refreshUnit();
          })
          .catch(() => {
            setLoading(false);
          });
      },
      collect: () => ({})
    }),
    [unitList]
  );
  return <div ref={drop}>{children}</div>;
};

export default DropLesson;
