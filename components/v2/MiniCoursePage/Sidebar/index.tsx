import { cn } from '@/helper/utils';
import { CompleteStateType } from '@/service/webApi/course/type';
import { FC, useState } from 'react';
import { HiMenu } from 'react-icons/hi';

import { GoCheck } from 'react-icons/go';
import { FiLock } from 'react-icons/fi';
import { PageType } from '@/service/webApi/elective/type';
import { useGetElectives } from '../hooks/useGetElectives';

interface SidebarProps {
  courseId: string;
}

const Sidebar: FC<SidebarProps> = ({ courseId }) => {
  const [showList, setShowList] = useState(false);

  const { course } = useGetElectives(courseId);

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
      <div className="flex justify-between">
        <span
          className={cn(
            'text-[#3E3E3E] text-[14px] font-next-book leading-[125%] tracking-[0.28px] pr-4',
            state === CompleteStateType.LEARNING
              ? 'font-next-book-bold text-[#212121] cursor-pointer'
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
    <div className="relative">
      <div
        className="absolute -top-2"
        onClick={() => {
          setShowList(!showList);
        }}
      >
        <HiMenu size={28} />
      </div>
      <div className={cn('w-[352px] pr-[32px]', showList ? 'flex' : 'hidden')}>
        {course && (
          <ul className="py-[40px] flex flex-col gap-[16px]">
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
