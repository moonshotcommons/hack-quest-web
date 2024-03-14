import React, { useEffect, useState } from 'react';
import HandleDot from './HandleDot';
import { LessonMenuType } from '../../constant/type';
import { message } from 'antd';

interface UnitLessonProp {
  lesson: LessonMenuType;
  handleEdit: (val: string) => void;
  handleDelete: VoidFunction;
  handleClickLesson: VoidFunction;
  curLessonId: string;
  isShowDelete: boolean;
}

const UnitLesson: React.FC<UnitLessonProp> = ({
  lesson: info,
  handleEdit,
  handleDelete,
  handleClickLesson,
  curLessonId,
  isShowDelete
}) => {
  const [lesson, setLesson] = useState<LessonMenuType | null>(null);
  const handleInput = () => {
    const newLesson = {
      ...lesson,
      isInput: true
    } as LessonMenuType;
    setLesson(newLesson);
  };

  useEffect(() => {
    setLesson(info);
  }, [info]);
  return (
    <div className="body-s group relative flex w-[calc(100%+40px)] items-center ">
      <div className="flex w-[calc(100%-40px)]  gap-[7px]">
        <div className="flex-center h-[24px] w-[24px]">
          <div className="flex-center h-[20px] w-[20px] rounded-[50%] border border-neutral-medium-gray">
            {lesson?.icon}
          </div>
        </div>
        {lesson?.isInput ? (
          <input
            className="body-s w-full border-b border-neutral-medium-gray bg-transparent text-neutral-black outline-none"
            value={lesson?.title}
            placeholder="Add a unit"
            maxLength={121}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              const value = target.value;
              setLesson({
                ...lesson,
                title: value
              });
            }}
            onKeyUp={(e) => {
              const target = e.target as HTMLInputElement;
              const value = target.value;
              if (e.code === 'Enter') {
                handleEdit(value);
              }
            }}
            onBlur={(e) => {
              const target = e.target as HTMLInputElement;
              const value = target.value;
              handleEdit(value);
            }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              const len = input.value.length;
              if (len > 120) {
                message.warning('120 characters maximum');
                input.value = input.value.slice(0, 120);
              }
            }}
          />
        ) : (
          <div
            className={`w-[calc(100%-40px)] cursor-pointer truncate break-all ${curLessonId === lesson?.id ? 'body-s-bold' : 'body-s '}`}
            onClick={handleClickLesson}
            onDoubleClick={handleInput}
          >
            <span className="relative max-w-full ">
              {lesson?.title}
              {curLessonId === lesson?.id && (
                <span className="absolute bottom-[-2px] left-0 h-[3px] w-full rounded-[100px] bg-yellow-dark"></span>
              )}
            </span>
          </div>
        )}
      </div>
      {!lesson?.isInput && (
        <HandleDot
          showDelete={isShowDelete}
          handleEdit={handleInput}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UnitLesson;
