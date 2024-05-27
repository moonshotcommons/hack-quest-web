import React, { useContext } from 'react';
import UnitLesson from './UnitLesson';
import { LessonMenuType, UgcCreateContext, UnitMenuType } from '../../constant/type';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import { cloneDeep } from 'lodash-es';
import { useDrag } from 'react-dnd';
import { isNull } from '@/helper/utils';
import webApi from '@/service';
import message from 'antd/es/message';
import { useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';

interface DrapLessonProp {
  unitList: UnitMenuType[];
  lesson: LessonMenuType;
  showDeleteModal: (type: string, unitIndex: number, lessonIndex: number) => void;
  changeUnitList: (list: UnitMenuType[]) => void;
  unitIndex: number;
  lessonIndex: number;
  refreshUnit: VoidFunction;
  isShowDelete: boolean;
}

const DrapLesson: React.FC<DrapLessonProp> = ({
  unitList,
  lesson,
  showDeleteModal,
  changeUnitList,
  unitIndex,
  lessonIndex,
  refreshUnit,
  isShowDelete
}) => {
  const { redirectToUrl } = useRedirect();
  const { courseId, selectLessonId, setSelectUnitMenuId } = useContext(UgcCreateContext);
  const { setLoading } = useUgcCreationStore(
    useShallow((state) => ({
      setLoading: state.setLoading
    }))
  );
  const [{ isDragging }, drop] = useDrag(
    () => ({
      type: lesson.id,
      item: lesson,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }),
    [unitList]
  );
  const handleEditLesson = (unitIndex: number, lessonIndex: number, val: string) => {
    if (isNull(val)) {
      const newUnitList = cloneDeep(unitList);
      newUnitList[unitIndex].pages[lessonIndex].title = lesson.title;
      newUnitList[unitIndex].pages[lessonIndex].isInput = false;
      changeUnitList(newUnitList);
    } else {
      //编辑
      setLoading(true);
      webApi.ugcCreateApi
        .editLesson(lesson.id, {
          title: val,
          sequence: lessonIndex,
          type: lesson.type,
          courseId,
          unitId: lesson.unitId
        })
        .then(() => {
          message.success('success');
          refreshUnit();
        })
        .catch(() => {
          setLoading(true);
        });
    }
  };
  const handleClickLesson = (lesson: LessonMenuType) => {
    setSelectUnitMenuId(unitList[unitIndex].id);
    redirectToUrl(`${MenuLink.UGC}/${courseId}/creation/${lesson.id}`);
  };

  return (
    <div ref={drop}>
      <UnitLesson
        lesson={lesson}
        curLessonId={selectLessonId}
        handleDelete={() => showDeleteModal('lesson', unitIndex, lessonIndex)}
        handleEdit={(val) => handleEditLesson(unitIndex, lessonIndex, val)}
        handleClickLesson={() => handleClickLesson(lesson)}
        isShowDelete={isShowDelete}
      />
    </div>
  );
};

export default DrapLesson;
