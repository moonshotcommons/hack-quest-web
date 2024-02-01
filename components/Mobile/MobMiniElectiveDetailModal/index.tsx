import Button from '@/components/Common/Button';
import { errorMessage } from '@/helper/ui';
import { cn } from '@/helper/utils';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { CompleteStateType } from '@/service/webApi/course/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import Loading from '@/components/Common/Loading';
import {
  ElectiveCourseDetailType,
  ElectiveCourseType,
  PageType
} from '@/service/webApi/elective/type';
import Logo from '@/public/images/logo/logo.svg';
import { GoCheck } from 'react-icons/go';
import { FiLock } from 'react-icons/fi';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { useGetLessonLink } from '@/hooks/useCoursesHooks/useGetLessonLink';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import Tags from '@/components/Common/Tags';
import { HiCodeBracket } from 'react-icons/hi2';

interface MiniElectiveDetailModalProps {}

export interface MiniElectiveDetailModalRef {
  open: (course: ElectiveCourseType) => void;
}

const MobMiniElectiveDetailModal = forwardRef<
  MiniElectiveDetailModalRef,
  MiniElectiveDetailModalProps
>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState<ElectiveCourseDetailType | null>(null);
  const { getLink } = useGetLessonLink();
  const { jumpLearningLesson, loading: jumpLoading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();
  const { run: getCourseDetail, loading } = useRequest(
    async (course) => {
      const res =
        await webApi.courseApi.getCourseDetail<ElectiveCourseDetailType>(
          course.id,
          false,
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
            const link = getLink(course!.type, item.id, course!.name);
            redirectToUrl(link);
          }
        }}
      >
        <span
          className={cn(
            'body-l text-neutral-rich-gray',
            [CompleteStateType.COMPLETED, CompleteStateType.LEARNING].includes(
              state
            )
              ? 'cursor-pointer'
              : '',
            state === CompleteStateType.LEARNING
              ? 'font-bold text-neutral-off-black'
              : '',
            state === CompleteStateType.NOT_STARTED
              ? 'text-neutral-medium-gray'
              : ''
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
    <>
      {open && (
        <Loading loading={loading}>
          <div
            className={`fixed left-0 top-[64px] z-[999] h-[calc(100vh-64px)] w-full overflow-hidden overflow-y-auto bg-neutral-white px-[24px] py-[12px]`}
          >
            <div className="w-full">
              <HiArrowLeft
                size={24}
                onClick={() => {
                  setOpen(false);
                  setCourse(null);
                }}
              />
            </div>
            {course && (
              <div className="flex h-fit flex-col">
                <div className="relative mt-3 h-[192px] w-full">
                  <Image src={course.image} fill alt="cover"></Image>
                </div>
                <div className="mt-6">
                  <Tags className="px-[10px] py-1 uppercase">Security</Tags>
                </div>
                <h2 className="body-l-bold mt-3 text-neutral-off-black">
                  {course.name}
                </h2>
                <p className="body-s mt-3 line-clamp-3 text-neutral-medium-gray">
                  {course.description}
                </p>

                <div className="mt-6 flex gap-6">
                  <div className="flex flex-1 flex-col gap-y-[12px]">
                    <span className="body-s-bold text-neutral-off-black">
                      Language
                    </span>
                    <div className="flex gap-2">
                      <span>
                        <HiCodeBracket size={20} />
                      </span>
                      <span className="body-s text-neutral-rich-gray">
                        {'Solidity'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-[12px]">
                    <span className="body-s-bold text-neutral-off-black">
                      Created by
                    </span>
                    <div
                      className="flex cursor-pointer items-center gap-[10px] px-[8px] py-[4px]"
                      onClick={() =>
                        redirectToUrl(
                          `${MenuLink.ECOSYSTEM}/${course.creatorId}`
                        )
                      }
                    >
                      <div className="relative h-[24px] w-[24px] overflow-hidden rounded-full bg-[#D9D9D9]">
                        <Image
                          src={course.creator?.profileImage || Logo}
                          fill
                          alt="create by"
                          className="object-contain"
                        ></Image>
                      </div>
                      <span className="body-s text-neutral-rich-gray">
                        {course.creator?.name || 'HackQuest'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="#131313 font-bold leading-[160%]">
                    Part of learning tracks
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <div className="w-fit rounded-[20px] bg-[#FFFAE0] px-[10px] py-1">
                      Specialize in NFT
                    </div>
                    <div className="w-fit rounded-[20px] bg-[#FFFAE0] px-[10px] py-1">
                      Specialize in Data
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col justify-between">
                  <p className="text-h4 text-neutral-black">Overview</p>
                  <ul className="mb-4 mt-6 pb-[112px]">
                    {course?.pages!.map((item, index) => {
                      return (
                        <li key={index} className="pr-2">
                          {index !== 0 && (
                            <div className="my-[24px] h-[1px] w-full bg-neutral-medium-gray"></div>
                          )}
                          {renderCourseListItem(item.state, item, index)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
            {course && (
              <div className="fixed bottom-3 left-1/2 w-full -translate-x-1/2 px-6">
                <Button
                  type="primary"
                  block
                  className={cn(
                    'h-fit py-[16px] ',
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
            )}
          </div>
        </Loading>
      )}
    </>
  );
});

export default MobMiniElectiveDetailModal;

MobMiniElectiveDetailModal.displayName = 'MobMiniElectiveDetailModal';
