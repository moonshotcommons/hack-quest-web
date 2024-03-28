import { cn } from '@/helper/utils';
import { CompleteStateType } from '@/service/webApi/course/type';
import { FC, useState } from 'react';
import { HiMenu } from 'react-icons/hi';

import { GoCheck } from 'react-icons/go';
import { FiLock } from 'react-icons/fi';
import { ElectiveLessonType, PageType } from '@/service/webApi/elective/type';
import { useGetElectives } from '../hooks/useGetElectives';
import { useGetLessonLink } from '@/hooks/courses/useGetLessonLink';
import { useRedirect } from '@/hooks/router/useRedirect';

interface SidebarProps {
  lesson: ElectiveLessonType;
}

const Sidebar: FC<SidebarProps> = ({ lesson }) => {
  const [showList, setShowList] = useState(false);
  const { getLink } = useGetLessonLink();
  const { course } = useGetElectives(lesson);
  const { redirectToUrl } = useRedirect();
  const renderCourseListItem = (state: CompleteStateType, item: PageType, index: number) => {
    if (index === 0) {
      if (state === CompleteStateType.NOT_STARTED) {
        state = CompleteStateType.LEARNING;
      }
    } else {
      if (state === CompleteStateType.NOT_STARTED && course?.pages![index - 1].state === CompleteStateType.COMPLETED) {
        state = CompleteStateType.LEARNING;
      }
    }

    return (
      <div
        className="flex justify-between"
        onClick={() => {
          if (item.id !== lesson.id && [CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(state)) {
            const link = getLink(course!.type, item.id);
            redirectToUrl(link);
          }
        }}
      >
        <span
          className={cn(
            'body-s pr-4',
            item.id === lesson.id ? 'body-s-bold text-neutral-dark-gray' : '',
            [CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(state) && item.id !== lesson.id
              ? 'cursor-pointer'
              : '',
            state === CompleteStateType.NOT_STARTED ? 'cursor-not-allowed text-neutral-medium-gray' : ''
          )}
        >{`${index + 1 < 10 ? '0' + (index + 1) : index + 1} ${item.title}`}</span>
        <div className="flex-shrink-0">
          {state === CompleteStateType.COMPLETED && <GoCheck color="#00C365" />}
          {state === CompleteStateType.NOT_STARTED && <FiLock color="#8C8C8C" />}
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-full ">
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
          <ul className="mt-[40px] flex h-[calc(100vh-144px)] flex-col gap-[16px] overflow-auto pb-[40px] pr-[10px]">
            {course.pages!.map((item, index) => {
              return <li key={index}>{renderCourseListItem(item.state, item, index)}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
