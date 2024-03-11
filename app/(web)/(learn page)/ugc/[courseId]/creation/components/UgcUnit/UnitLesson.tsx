import React, { useEffect, useState } from 'react';
import HandleDot from './HandleDot';
import { LessonMenuType } from '../../constant/type';

interface UnitLessonProp {
  lesson: LessonMenuType;
  handleEdit: (val: string) => void;
  handleDelete: VoidFunction;
  handleClickLesson: VoidFunction;
  curLessonId: string;
}

const UnitLesson: React.FC<UnitLessonProp> = ({
  lesson: info,
  handleEdit,
  handleDelete,
  handleClickLesson,
  curLessonId
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
            value={lesson?.value}
            placeholder="Add a unit"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              const value = target.value;
              setLesson({
                ...lesson,
                value
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
          />
        ) : (
          <div
            className={`w-[calc(100%-40px)] cursor-pointer break-all ${curLessonId === lesson?.id ? 'body-s-bold' : 'body-s '}`}
            onClick={handleClickLesson}
          >
            <span className="relative max-w-full">
              {lesson?.value}
              {curLessonId === lesson?.id && (
                <span className="absolute bottom-[-2px] left-0 h-[3px] w-full rounded-[100px] bg-yellow-dark"></span>
              )}
            </span>
          </div>
        )}
      </div>
      {!lesson?.isInput && (
        <HandleDot handleEdit={handleInput} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default UnitLesson;
