import React, { useContext } from 'react';
import UnitLesson from './UnitLesson';
import {
  LessonMenuType,
  UgcCreateContext,
  UnitMenuType
} from '../../constant/type';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useRedirect } from '@/hooks/useRedirect';
import { cloneDeep } from 'lodash-es';
import { useDrag } from 'react-dnd';
import { isNull } from '@/helper/utils';

interface DrapLessonProp {
  unitList: UnitMenuType[];
  lesson: LessonMenuType;
  showDeleteModal: (
    type: string,
    unitIndex: number,
    lessonIndex: number
  ) => void;
  changeUnitList: (list: UnitMenuType[]) => void;
  unitIndex: number;
  lessonIndex: number;
}

const DrapLesson: React.FC<DrapLessonProp> = ({
  unitList,
  lesson,
  showDeleteModal,
  changeUnitList,
  unitIndex,
  lessonIndex
}) => {
  const { redirectToUrl } = useRedirect();
  const { courseId, selectLessonId, setSelectUnitMenuId } =
    useContext(UgcCreateContext);
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
  const handleEditLesson = (
    unitIndex: number,
    lessonIndex: number,
    val: string
  ) => {
    const lesson = unitList[unitIndex].pages[lessonIndex];
    const newUnitList = cloneDeep(unitList);
    newUnitList[unitIndex].pages[lessonIndex].title = isNull(val)
      ? lesson.title
      : val;
    newUnitList[unitIndex].pages[lessonIndex].isInput = false;
    changeUnitList(newUnitList);
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
      />
    </div>
  );
};

export default DrapLesson;
