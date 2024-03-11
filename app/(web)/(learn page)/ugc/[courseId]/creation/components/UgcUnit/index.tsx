import Button from '@/components/Common/Button';
import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { v4 } from 'uuid';
import DeleteModal from './DeleteModal';
import { CreationHandleKey, UnitMenuType } from '../../constant/type';
import { cloneDeep } from 'lodash-es';
import { isNull } from '@/helper/utils';
import emitter from '@/store/emitter';
import {
  CreationPageKey,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useRedirect } from '@/hooks/useRedirect';
import { LessonType } from '../UgcSidebar/constant';
import { getLessonIconData } from '../../constant/data';
import { message } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragUnit from './DragUnit';
import DropUnit from './DropUnit';
import DropLesson from './DropLesson';
import DrapLesson from './DrapLesson';

interface UgcUnitProp {}

const UgcUnit: React.FC<UgcUnitProp> = () => {
  const [unitList, setUnitList] = useState<UnitMenuType[]>([]);
  const [handleInfo, setHandleInfo] = useState<Record<string, any>>({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [unitDraging, setUnitDraging] = useState(false);
  const { redirectToUrl } = useRedirect();
  const {
    courseId,
    selectLessonId,
    selectUnitMenuId,
    setSelectUnitMenuId,
    setLessonType
  } = useUgcCreationStore(
    useShallow((state) => ({
      courseId: state.courseId,
      selectLessonId: state.selectLessonId,
      selectUnitMenuId: state.selectUnitMenuId,
      setSelectUnitMenuId: state.setSelectUnitMenuId,
      setLessonType: state.setLessonType
    }))
  );
  const handleAddUit = () => {
    const unit = {
      id: v4(),
      value: '',
      isInput: true,
      isToggle: true,
      lessonInputValue: '',
      isDragging: false,
      lesson: []
    };
    setUnitList([...unitList, unit]);
  };
  const handleAddLesson = (type: any) => {
    const index = unitList.findIndex((v) => v.id === selectUnitMenuId);
    const value = unitList[index]?.lessonInputValue;
    if (isNull(value)) {
      message.warning('Enter lesson name');
      return;
    }
    const lesson = {
      id: v4(),
      value: value,
      type,
      icon: getLessonIconData(15)[type as LessonType],
      isInput: false,
      isDragging: false
    };
    const newUnitList = cloneDeep(unitList);
    newUnitList[index].lesson.push(lesson);
    newUnitList[index].lessonInputValue = '';
    setUnitList(newUnitList);
  };
  const showDeleteModal = (
    type: string,
    unitIndex: number,
    lessonIndex = 0
  ) => {
    if (type === 'unit') {
      setHandleInfo({
        id: unitList[unitIndex].id,
        type: 'unit',
        title: 'Do you want to delete the unit bellow?',
        content: unitList[unitIndex].value
      });
    } else {
      setHandleInfo({
        id: unitList[unitIndex].lesson[lessonIndex].id,
        type: 'lesson',
        title: 'Do you want to delete the session bellow?',
        content: (
          <div className="flex items-center gap-[7px]">
            <div className="flex-center h-[20px] w-[20px] rounded-[50%] border border-neutral-medium-gray">
              {unitList[unitIndex].lesson[lessonIndex].icon}
            </div>
            <span>{unitList[unitIndex].lesson[lessonIndex].value}</span>
          </div>
        )
      });
    }

    setDeleteModal(true);
  };
  const handleDelete = (id: string, type: string) => {
    if (type === 'unit') {
      console.info(unitList, id);
      const newUnitList = unitList.filter((unit) => unit.id !== id);
      setUnitList(newUnitList);
      /**
       * 如果当前展示的lesson所在的unit被删除 则需要跳转新的lesson
       * 删除后的unit如果为空 默认跳转选择lesson页面
       * 删除第一个unit 默认跳转删除后第一个unit第一个的lesson 其余为默认跳转上一个unit的第一个lesson
       */
      if (unitList.some((unit) => unit.id === selectUnitMenuId)) {
        let toPathLessonId;
        if (!newUnitList.length) {
          toPathLessonId = CreationPageKey.ChooseLesson;
        } else {
          const unitIndex = unitList.findIndex((unit) => unit.id !== id);
          const lessonIdIndex = !unitIndex ? unitIndex : unitIndex - 1;
          toPathLessonId =
            newUnitList[unitIndex].lesson[lessonIdIndex]?.id ||
            CreationPageKey.ChooseLesson;
        }
        redirectToUrl(`${MenuLink.UGC}/${courseId}/creation/${toPathLessonId}`);
      }
    } else {
      const newUnitList = cloneDeep(unitList);
      const unitIndex = unitList.findIndex((unit) =>
        unit.lesson.some((lesson) => lesson.id === id)
      );
      const newLesson = unitList[unitIndex].lesson.filter(
        (lesson) => lesson.id !== id
      );
      newUnitList[unitIndex].lesson = newLesson;
      setUnitList(newUnitList);
      /** 如果当前展示的lesson被删除  则需要跳转新的lesson
       * 删除后的lesson如果为空 默认跳转选择lesson页面
       * 删除第一个lesson 默认跳转删除后第一个的lesson 其余为默认跳转个lesson
       */
      if (selectLessonId === id) {
        let toPathLessonId;
        if (!newLesson.length) {
          toPathLessonId = CreationPageKey.ChooseLesson;
        } else {
          const lessonIndex = unitList[unitIndex].lesson.findIndex(
            (lesson) => lesson.id !== id
          );
          const lessonIdIndex = !lessonIndex ? lessonIndex : lessonIndex - 1;
          toPathLessonId =
            newUnitList[unitIndex].lesson[lessonIdIndex]?.id ||
            CreationPageKey.ChooseLesson;
        }
        redirectToUrl(`${MenuLink.UGC}/${courseId}/creation/${toPathLessonId}`);
      }
    }
    setDeleteModal(false);
  };
  const chooseLesson = (id: string) => {
    setSelectUnitMenuId(id);
    redirectToUrl(
      `${MenuLink.UGC}/${courseId}/creation/${CreationPageKey.ChooseLesson}`
    );
  };

  if (emitter.all.get(CreationHandleKey.ADD_LESSON)) {
    emitter.all.delete(CreationHandleKey.ADD_LESSON);
  }
  emitter.on(CreationHandleKey.ADD_LESSON, handleAddLesson);

  useEffect(() => {
    return () => {
      emitter.off(CreationHandleKey.ADD_LESSON, handleAddLesson);
    };
  }, []);

  return (
    <div className="scroll-wrap-y relative z-[10] h-full w-[296px] flex-shrink-0 border-l-[1px] border-neutral-light-gray bg-neutral-off-white px-[40px] py-[30px] text-neutral-black shadow-[2px_0_4px_0_rgba(0,0,0,0.12)]">
      <DndProvider backend={HTML5Backend}>
        {unitList.map((unit, unitIndex) => (
          <div
            key={unit.id}
            className={`mb-[20px] border-b border-neutral-medium-gray pb-[20px]`}
          >
            <DropUnit
              unitList={unitList}
              changeUnitList={(list) => setUnitList(list)}
              index={unitIndex}
            >
              <DragUnit
                unit={unit}
                unitIndex={unitIndex}
                unitList={unitList}
                changeUnitList={(list) => setUnitList(list)}
                handleDelete={handleDelete}
                showDeleteModal={showDeleteModal}
                changeDraging={(isDragging) => setUnitDraging(isDragging)}
              />
            </DropUnit>
            <div
              className={`${!unitDraging && unit.value ? 'block' : 'hidden'}`}
            >
              <div
                className={`body-s  flex-col gap-[15px] pt-[15px] ${unit.isToggle ? 'flex' : 'hidden'}`}
              >
                {unit.lesson.map((lesson, lessonIndex) => (
                  <DropLesson
                    key={lesson.id}
                    changeUnitList={(list) => setUnitList(list)}
                    lessonIndex={lessonIndex}
                    unitIndex={unitIndex}
                    unitList={unitList}
                  >
                    <DrapLesson
                      unitIndex={unitIndex}
                      lessonIndex={lessonIndex}
                      changeUnitList={(list) => setUnitList(list)}
                      unitList={unitList}
                      lesson={lesson}
                      showDeleteModal={showDeleteModal}
                    ></DrapLesson>
                  </DropLesson>
                ))}
                <div className="flex items-center gap-[7px]">
                  <IoMdAddCircle
                    size={24}
                    className=" flex-shrink-0  text-neutral-medium-gray"
                  />

                  <input
                    type="text"
                    placeholder="Add a lesson / quiz"
                    className="flex-1  bg-transparent text-neutral-black outline-none"
                    value={unit.lessonInputValue}
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      const value = target.value;
                      const newUnitList = cloneDeep(unitList);
                      newUnitList[unitIndex].lessonInputValue = value;
                      setUnitList(newUnitList);
                    }}
                    onClick={() => chooseLesson(unit.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={() => handleAddUit()}
          icon={<IoMdAddCircle size={24} />}
          className="body-s  h-[48px] w-full bg-neutral-white text-neutral-medium-gray"
        >
          Add an unit
        </Button>
      </DndProvider>

      <DeleteModal
        open={deleteModal}
        handleDelete={() => handleDelete(handleInfo.id, handleInfo.type)}
        deleteInfo={handleInfo}
      />
    </div>
  );
};

export default UgcUnit;
