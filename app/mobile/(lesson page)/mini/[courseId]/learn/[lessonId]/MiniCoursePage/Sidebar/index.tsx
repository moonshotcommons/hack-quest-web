import { cn } from '@/helper/utils';
import { CompleteStateType } from '@/service/webApi/course/type';
import { FC, useState } from 'react';
import { HiMenu } from 'react-icons/hi';

import { GoCheck } from 'react-icons/go';
import { FiLock } from 'react-icons/fi';
import { ElectiveLessonType, PageType } from '@/service/webApi/elective/type';
import { useGetElectives } from '../hooks/useGetElectives';
import { useGetLessonLink } from '@/hooks/useCoursesHooks/useGetLessonLink';
import { useRedirect } from '@/hooks/useRedirect';

interface SidebarProps {
  lesson: ElectiveLessonType;
}

const Sidebar: FC<SidebarProps> = ({ lesson }) => {
  const [showList, setShowList] = useState(false);
  const { getLink } = useGetLessonLink();
  const { course } = useGetElectives(lesson);
  const { redirectToUrl } = useRedirect();
  const renderCourseListItem = (
    state: CompleteStateType,
    item: PageType,
    index: number
  ) => {
    if (index === 0) {
      if (state === CompleteStateType.NOT_STARTED) {
        state = CompleteStateType.LEARNING;
      }
    } else {
      if (
        state === CompleteStateType.NOT_STARTED &&
        course?.pages![index - 1].state === CompleteStateType.COMPLETED
      ) {
        state = CompleteStateType.LEARNING;
      }
    }

    return (
      <div
        className="flex justify-between"
        onClick={() => {
          if (
            item.id !== lesson.id &&
            [CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(
              state
            )
          ) {
            const link = getLink(course!.type, item.id);
            redirectToUrl(link);
          }
        }}
      >
        <span
          className={cn(
            'text-[#3E3E3E] text-[14px] font-next-book leading-[125%] tracking-[0.28px] pr-4',
            item.id === lesson.id ? 'font-next-book-bold text-[#212121]' : '',
            [CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(
              state
            ) && item.id !== lesson.id
              ? 'cursor-pointer'
              : '',
            state === CompleteStateType.NOT_STARTED
              ? 'text-[#8C8C8C] cursor-not-allowed'
              : ''
          )}
        >{`${index + 1 < 10 ? '0' + (index + 1) : index + 1} ${
          item.name
        }`}</span>
        {state === CompleteStateType.COMPLETED && <GoCheck color="#00C365" />}
        {state === CompleteStateType.NOT_STARTED && <FiLock color="#8C8C8C" />}
      </div>
    );
  };

  return (
    <div className="fixed top-[18px] left-[20px] z-[100]">
      <div
        tabIndex={0}
        onClick={() => {
          setShowList(!showList);
        }}
      >
        <HiMenu size={28} color={'#fff'} />
      </div>
      <div
        className={cn(
          'fixed left-[20px] top-[50px] w-[273px]  rounded-[12px] bg-[#F4F4F4] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.12)]',
          showList ? 'flex' : 'hidden'
        )}
      >
        {course && (
          <ul className="p-[24px] flex flex-col gap-[16px]">
            {course.pages!.map((item, index) => {
              return (
                <li key={index}>
                  {renderCourseListItem(item.state, item, index)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
