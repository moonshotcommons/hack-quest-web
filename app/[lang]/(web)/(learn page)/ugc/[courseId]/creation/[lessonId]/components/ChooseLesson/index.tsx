import React, { useState } from 'react';
import { lessonTypeData } from '../../../constant/data';
import { LessonType } from '../../../components/UgcSidebar/constant';
import Button from '@/components/Common/Button';
import emitter from '@/store/emitter';
import { CreationHandleKey } from '../../../constant/type';

interface ChooseLessonProp {}

export const SuggestText = () => {
  return (
    <div className="body-l absolute bottom-[0] left-0 flex w-full justify-center bg-neutral-off-white py-[40px]">
      <p className="max-w-[808px] text-left">
        We suggest commencing each unit with Reading and Video Lessons. Begin by introducing principles and concepts
        through these sessions. Following this, you can reinforce the acquired knowledge with quizzes. Finally, conclude
        the unit with either a Reading or Video Lesson to provide a comprehensive summary.
      </p>
    </div>
  );
};
const ChooseLesson: React.FC<ChooseLessonProp> = () => {
  const [chooseLesson, setChooseLesson] = useState<LessonType | null>(null);
  const addLesson = () => {
    if (!chooseLesson) return;
    emitter.emit(CreationHandleKey.ADD_LESSON, chooseLesson);
  };
  return (
    <div className="flex text-neutral-black">
      <div className="flex w-full flex-col items-center gap-[30px]">
        <p className="text-h3 ">Please choose the session you want to add</p>
        <div className="flex w-full gap-[20px]">
          {lessonTypeData.map((lesson) => (
            <div
              key={lesson.value}
              onClick={() => setChooseLesson(lesson.value)}
              className={`flex h-[256px] flex-1 flex-shrink-0 cursor-pointer flex-col items-center gap-[15px] rounded-[10px] border-[3px] p-[20px] text-neutral-black  ${chooseLesson === lesson.value ? 'border-neutral-medium-gray bg-neutral-off-white' : 'border-neutral-off-white bg-neutral-white'}`}
            >
              <div className="flex-center h-[42px] w-[42px] rounded-[50%] border border-neutral-black">
                {lesson.icon}
              </div>
              <p className="text-h5">{lesson.label}</p>
              <p className="body-s">{lesson.description}</p>
            </div>
          ))}
        </div>
        <Button
          className={`button-text-m mb-[100px] h-[48px] w-[165px] uppercase  ${chooseLesson ? 'bg-yellow-dark text-neutral-black' : 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray'}`}
          onClick={addLesson}
        >
          add
        </Button>
      </div>
    </div>
  );
};

export default ChooseLesson;
