import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { errorMessage } from '@/helper/ui';
import { cn } from '@/helper/utils';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { CompleteStateType } from '@/service/webApi/course/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { ElectiveCourseDetailType, ElectiveCourseType, PageType } from '@/service/webApi/elective/type';
import Logo from '@/public/images/logo/logo.svg';
import Tag from '../CourseTags/tag';
import ClockIcon from '@/components/Common/Icon/Clock';
import { computeTime } from '@/helper/formate';
import { GoCheck } from 'react-icons/go';
import { FiLock } from 'react-icons/fi';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { QueryIdType } from '../Breadcrumb/type';
import { useGetLessonLink } from '@/hooks/courses/useGetLessonLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import Loading from '@/components/Common/Loading';
import MenuLink from '@/constants/MenuLink';
interface MiniElectiveDetailModalProps {}

export interface MiniElectiveDetailModalRef {
  open: (course: ElectiveCourseType) => void;
}

const MiniElectiveDetailModal = forwardRef<MiniElectiveDetailModalRef, MiniElectiveDetailModalProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState<ElectiveCourseDetailType | null>(null);
  const { getLink } = useGetLessonLink();
  const { jumpLearningLesson, loading: jumpLoading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();
  const { run: getCourseDetail, loading } = useRequest(
    async (course) => {
      const res = await webApi.courseApi.getCourseDetail<ElectiveCourseDetailType>(course.id, false, true);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setCourse(res);
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
          if ([CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(state)) {
            const link = getLink(course!.type, item.id, course?.title);
            redirectToUrl(link);
          }
        }}
      >
        <span
          className={cn(
            'body-l text-neutral-rich-gray',
            [CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(state) ? 'cursor-pointer' : '',
            state === CompleteStateType.LEARNING ? 'body-l-bold text-neutral-off-black' : '',
            state === CompleteStateType.NOT_STARTED ? 'text-neutral-medium-gray' : ''
          )}
        >{`${index + 1 < 10 ? '0' + (index + 1) : index + 1} ${item.title}`}</span>
        {state === CompleteStateType.COMPLETED && <GoCheck color="#00C365" size={20} />}
        {state === CompleteStateType.NOT_STARTED && <FiLock color="#8C8C8C" size={20} />}
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div className="h-[625px] w-[1000px] overflow-hidden rounded-[16px] bg-neutral-white p-[32px]">
          {course && (
            <div className="mt-[24px] flex max-h-[625px] justify-between gap-x-[96px] p-[24px]">
              <div className="flex w-[400px] flex-col gap-[32px]">
                <div className="relative h-[225px] w-full">
                  <Image src={course.image} fill alt="cover"></Image>
                </div>
                <div>
                  <h2 className="text-h2 text-neutral-black">{course.title}</h2>
                  <p className="mt-[16px] text-neutral-rich-gray">{course.description}</p>
                </div>
                <div className="body-s flex items-center gap-[32px] text-neutral-black">
                  <div className="flex items-center gap-x-[12px]">
                    <span>Created by</span>
                    <div
                      className="flex cursor-pointer items-center gap-[10px] rounded-[17px] border border-neutral-medium-gray px-[8px] py-[4px]"
                      onClick={() => redirectToUrl(`${MenuLink.ECOSYSTEM}/${course.creatorId}`)}
                    >
                      <div className="relative h-[24px] w-[24px] overflow-hidden rounded-full bg-[#D9D9D9]">
                        <Image
                          src={course.creator?.profileImage || Logo}
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
              <div className="ju flex flex-1 flex-col overflow-hidden">
                <div className="flex flex-1 flex-col justify-between overflow-hidden">
                  <p className="text-h4 text-neutral-black">Overview</p>
                  <ul className="scroll-wrap-y mb-4 mt-[32px] max-h-[372px] flex-1 overflow-auto">
                    {course?.pages!.map((item, index) => {
                      return (
                        <li key={index} className="pr-2">
                          {index !== 0 && <div className="my-[24px] h-[1px] w-full bg-neutral-medium-gray"></div>}
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
                    className={cn('h-fit py-[16px] ', jumpLoading ? 'cursor-not-allowed' : 'cursor-pointer')}
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
                    {course.pages![0].state === CompleteStateType.NOT_STARTED ? 'Start Learning' : 'Resume Learning'}
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
