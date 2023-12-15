import Button from '@/components/v2/Common/Button';
import Modal from '@/components/v2/Common/Modal';
import { cn, errorMessage } from '@/helper/utils';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState } from 'react';

import {
  CompleteStateType,
  CourseResponse
} from '@/service/webApi/course/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import Loading from '../../Common/Loading';
import {
  MiniElectiveCourseType,
  PageType
} from '@/service/webApi/elective/type';
import Logo from '@/public/images/logo/logo.svg';
import Tag from '../CourseTags/tag';
import ClockIcon from '../../Common/Icon/Clock';
import { computeTime } from '@/helper/formate';
import { GoCheck } from 'react-icons/go';
import { FiLock } from 'react-icons/fi';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { QueryIdType } from '../Breadcrumb/type';
import { useGetLessonLink } from '@/hooks/useCoursesHooks/useGetLessonLink';
import { useRouter } from 'next/router';
interface MiniElectiveDetailModalProps {}

export interface MiniElectiveDetailModalRef {
  open: (course: CourseResponse) => void;
}

const MiniElectiveDetailModal = forwardRef<
  MiniElectiveDetailModalRef,
  MiniElectiveDetailModalProps
>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState<MiniElectiveCourseType | null>(null);
  const { getLink } = useGetLessonLink();
  const { jumpLearningLesson, loading: jumpLoading } = useJumpLeaningLesson();
  const router = useRouter();
  const { run: getCourseDetail, loading } = useRequest(
    async (course) => {
      const res = await webApi.electiveApi.getElectiveDetailAndPages(
        course.id,
        true
      );
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setCourse(res);
        console.log(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useImperativeHandle(ref, () => {
    return {
      open(course) {
        setOpen(true);
        getCourseDetail(course);
      }
    };
  });

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
            [CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(
              state
            )
          ) {
            const link = getLink(course!.type, item.id);
            router.push(link);
          }
        }}
      >
        <span
          className={cn(
            'text-[#3E3E3E] text-[18px] font-next-book leading-[125%] tracking-[0.36px]',
            [CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(
              state
            )
              ? 'cursor-pointer'
              : '',
            state === CompleteStateType.LEARNING
              ? 'font-next-book-bold text-[#131313]'
              : '',
            state === CompleteStateType.NOT_STARTED ? 'text-[#8C8C8C]' : ''
          )}
        >{`${index + 1 < 10 ? '0' + (index + 1) : index + 1} ${
          item.name
        }`}</span>
        {state === CompleteStateType.COMPLETED && (
          <GoCheck color="#00C365" size={20} />
        )}
        {state === CompleteStateType.NOT_STARTED && (
          <FiLock color="#8C8C8C" size={20} />
        )}
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setCourse(null);
      }}
      showCloseIcon
      icon={
        <div className="absolute -right-[8px] -top-[8px] cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
              fill="#0B0B0B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="#0B0B0B"
            />
          </svg>
        </div>
      }
      markBg="black"
    >
      <Loading loading={loading}>
        <div className="w-[1000px] h-[625px] bg-white rounded-[16px] p-[32px] overflow-hidden">
          {course && (
            <div className="flex justify-between max-h-[625px] p-[24px] mt-[24px] gap-x-[96px]">
              <div className="w-[400px] flex flex-col gap-[32px]">
                <div className="w-full h-[225px] relative">
                  <Image src={course.image} fill alt="cover"></Image>
                </div>
                <div>
                  <h2 className="font-next-poster-Bold text-[#0B0B0B] text-[40px] tracking-[2.4px] leading-[125%]">
                    {course.name}
                  </h2>
                  <p className="mt-[16px] font-next-book text-[#3E3E3E] leading-[125%] tracking-[0.32px]">
                    {course.description}
                  </p>
                </div>
                <div className="flex gap-[32px] items-center font-next-book text-[14px] leading-[125%] tracking-[0.28px] text-[#0B0B0B]">
                  <div className="flex gap-x-[12px] items-center">
                    <span>Created by</span>
                    <div className="px-[8px] py-[4px] flex gap-[10px] items-center border border-[#8C8C8C] rounded-[17px]">
                      <div className="w-[24px] h-[24px] rounded-full bg-[#D9D9D9] relative overflow-hidden">
                        <Image
                          src={course.creator?.avatar || Logo}
                          fill
                          alt="create by"
                          className="object-contain"
                        ></Image>
                      </div>
                      <span>{course.creator?.name || 'HackQuest'}</span>
                    </div>
                  </div>
                  <Tag icon={<ClockIcon />} size="large">
                    {computeTime(course?.duration || 0, 'Hour')}
                  </Tag>
                </div>
              </div>
              <div className="flex-1 flex flex-col ju overflow-hidden">
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <p className="text-[21px] font-next-poster-Bold text-[#0B0B0B] tracking-[1.26px]">
                    Overview
                  </p>
                  <ul className="mt-[32px] flex-1 overflow-auto max-h-[372px] scroll-wrap-y mb-4">
                    {course?.pages!.map((item, index) => {
                      return (
                        <li key={index} className="pr-2">
                          {index !== 0 && (
                            <div className="h-[1px] w-full bg-[#8C8C8C] my-[24px]"></div>
                          )}
                          {renderCourseListItem(item.state, item, index)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <Button
                    type="primary"
                    block
                    className={cn(
                      'py-[16px] font-next-book h-fit',
                      jumpLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                    )}
                    loading={jumpLoading}
                    onClick={() => {
                      if (jumpLoading) {
                        return;
                      }
                      jumpLearningLesson(course, {
                        menu: 'electives',
                        idTypes: [QueryIdType.MENU_COURSE_ID],
                        ids: [course.id]
                      });
                    }}
                  >
                    {course.pages![0].state === CompleteStateType.NOT_STARTED
                      ? 'Start Learning'
                      : 'Resume Learning'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Loading>
    </Modal>
  );
});

export default MiniElectiveDetailModal;

MiniElectiveDetailModal.displayName = 'MiniElectiveDetailModal';
