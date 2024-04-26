import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { Theme } from '@/constants/enum';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import Congrats from '@/public/images/course/congrats.svg';
import DarkMoonLeft from '@/public/images/other/dark-moon_left.svg';
import DarkMoonRight from '@/public/images/other/dark-moon_right.png';
import LightMoonLeft from '@/public/images/other/light-moon_left.svg';
import LightMoonRight from '@/public/images/other/light-moon_right.png';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { Menu, QueryIdType } from '../Breadcrumb/type';
import { useSearchParams } from 'next/navigation';
interface CompleteModalProps {}

interface OpenParams {
  type: 'course' | 'claim';
  title: string;
  courseId?: string;
  nextCourse: ProjectCourseType | null;
}

export interface CompleteModalInstance {
  open: (params: OpenParams) => void;
  close: (closeCallback?: VoidFunction) => void;
}

const CompleteModal = forwardRef<CompleteModalInstance, CompleteModalProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [type, setType] = useState<'course' | 'claim'>('course');
  const [title, setTitle] = useState('');
  const [nextButtonInfo, setNextButtonInfo] = useState<{ open: boolean; nextCourse: ProjectCourseType | null }>({
    open: false,
    nextCourse: null
  });

  const query = useSearchParams();

  const { jumpLearningLesson, loading } = useJumpLeaningLesson();

  useImperativeHandle(ref, () => {
    return {
      open(params) {
        setType(params.type);
        setTitle(params.title);
        if (params.nextCourse) {
          setNextButtonInfo({
            open: true,
            nextCourse: params.nextCourse
          });
        }
        setOpen(true);
      },
      close(closeCallback) {
        setOpen(false);
        closeCallback?.();
      }
    };
  });

  // const {} = useRequest(() => {

  // })

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      markBg="black"
    >
      <div className="relative m-auto flex h-[35.6875rem] w-[74.0625rem] flex-col items-center overflow-hidden rounded-[2.5rem] bg-lesson-completed-modal-bg">
        <div className="absolute left-0 top-0">
          {theme === Theme.Dark && <Image src={DarkMoonLeft} alt="bg"></Image>}
          {theme === Theme.Light && <Image src={LightMoonLeft} alt="bg"></Image>}
        </div>
        <div className="absolute right-0 top-0">
          {theme === Theme.Dark && <Image src={DarkMoonRight} alt="bg"></Image>}
          {theme === Theme.Light && <Image src={LightMoonRight} alt="bg"></Image>}
        </div>
        <div className="mt-[91px]">
          <Image src={Congrats} alt="completed" width={45} height={50}></Image>
        </div>
        <h1
          className="
                   
                     
                  body-xl relative mt-[20px] w-[34.625rem] py-[23px]
text-center text-text-default-color before:absolute before:left-[50%] before:top-[0px] before:h-[1px] before:w-[27.75rem] before:-translate-x-[50%] before:scale-y-[1] before:bg-lesson-completed-modal-line-color after:absolute
after:-bottom-[0px] after:left-0 after:h-[1px] after:w-full after:scale-y-[1] after:bg-lesson-completed-modal-line-color "
        >
          COURSE COMPLETE!
        </h1>
        <p className="body-l mt-[20px] text-text-default-color">{decodeURIComponent(title)}</p>
        {type === 'course' && (
          <div className="mt-[100px] flex gap-[1.25rem]">
            <Link href={'/dashboard'} onClick={() => setOpen(false)}>
              <Button ghost className="body-l w-[244px]  px-0 py-[1rem] text-lesson-primary-button-text-color">
                Back to Homepage
              </Button>
            </Link>
            {nextButtonInfo.open && !!nextButtonInfo.nextCourse && (
              <Button
                type="primary"
                className="body-l w-[244px]  px-0 py-[1rem] capitalize text-lesson-primary-button-text-color"
                loading={loading}
                onClick={() => {
                  setOpen(false);
                  jumpLearningLesson(nextButtonInfo.nextCourse!, {
                    menu: Menu.LEARNING_TRACK,
                    idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
                    ids: [query.get(QueryIdType.LEARNING_TRACK_ID) || '', nextButtonInfo.nextCourse!.id] as string[]
                  });
                }}
              >
                continue learning
              </Button>
            )}
          </div>
        )}
        {type === 'claim' && (
          <div className="flex w-full flex-col items-center">
            <p className="body-m mt-[10px] w-[297px] text-center text-neutral-rich-gray">
              You have completed this learning track. Continue to claim your Badge.
            </p>
            <Button
              type="primary"
              className="body-m mt-[30px] flex w-[260px] items-center justify-center px-0 py-[11px] text-neutral-black"
            >
              Claim Certificate
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
});

CompleteModal.displayName = 'CompleteModal';

export default CompleteModal;
