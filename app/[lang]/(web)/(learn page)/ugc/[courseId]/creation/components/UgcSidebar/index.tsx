'use client';
import Sidebar, { SidebarItemType } from '@/components/Web/Business/Sidebar';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useRedirect } from '@/hooks/useRedirect';
import { FC, useContext, useMemo } from 'react';
import Button from '@/components/Common/Button';
import {
  CourseContentType,
  CreationPageKey,
  UgcCreateContext
} from '../../constant/type';
import { labelMaps } from './constant';
import useUgcCreationDataHandle from '@/hooks/useUgcCreationDataHandle';
import {
  CreationHandle,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';
import { lessonIdKeys } from '../../constant/data';

interface UgcSidebarProps {}

const INFORMATION_KEY = 'courseInformation';
const CONTENT_KEY = 'content';
const PUBLISH_KEY = 'publish';
const content: CourseContentType = {
  getYourReady: {
    completed: false
  },
  curriculum: {
    completed: false,
    units: []
  }
};

const UgcSidebar: FC<UgcSidebarProps> = () => {
  const { courseId, courseInformation, selectLessonId } =
    useContext(UgcCreateContext);
  const { getUnitList } = useUgcCreationDataHandle(courseId);
  const { redirectToUrl } = useRedirect();
  const disableAll = (key: string) => {
    if (key === 'introduction') {
      return false;
    } else {
      return !courseInformation.introduction.completed;
    }
  };

  const { loading, setHandle, handle } = useUgcCreationStore(
    useShallow((state) => ({
      loading: state.loading,
      setHandle: state.setHandle,
      handle: state.handle
    }))
  );

  const items: SidebarItemType[] = useMemo(() => {
    const informationChildren: SidebarItemType[] = Object.keys(
      courseInformation
    ).map((key) => {
      return {
        key: key,
        disable: disableAll(key),
        label: (
          <div className={`body-m flex w-full justify-between`}>
            <div className="flex flex-1 shrink-0 flex-col overflow-hidden pr-5">
              {labelMaps[key as keyof typeof courseInformation]}
            </div>
            <div>
              {!courseInformation[key as keyof typeof courseInformation]
                .completed && (
                <div className="h-6 w-6 rounded-full border border-neutral-black"></div>
              )}
              {courseInformation[key as keyof typeof courseInformation]
                .completed && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="#00C365" />
                </svg>
              )}
            </div>
          </div>
        ),
        data: courseInformation[key as keyof typeof courseInformation],
        type: 'item'
      };
    });

    return [
      {
        key: INFORMATION_KEY,
        label: <h4 className="text-h4">Course Information</h4>,
        type: 'group',
        data: courseInformation,
        children: informationChildren
      },
      {
        key: CONTENT_KEY,
        label: <h4 className="text-h4">Content</h4>,
        type: 'group',
        data: content,
        children: Object.keys(content).map((key) => {
          return {
            key,
            disable: disableAll(key),
            label: (
              <div className={`body-m flex w-full justify-between`}>
                <div className="flex flex-1 shrink-0 flex-col overflow-hidden pr-5">
                  {labelMaps[key as keyof CourseContentType]}
                </div>
                <div>
                  {!content[key as keyof CourseContentType].completed && (
                    <div className="h-6 w-6 rounded-full border border-neutral-black"></div>
                  )}
                  {content[key as keyof CourseContentType].completed && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="12" fill="#00C365" />
                    </svg>
                  )}
                </div>
              </div>
            ),
            data: content[key as keyof typeof content],
            type: 'item'
          };
        })
      }
    ];
  }, [courseInformation, content, disableAll]);

  const defaultOpenKeys = useMemo(() => {
    if (
      [
        CreationPageKey.Introduction,
        CreationPageKey.IntendedLearners,
        CreationPageKey.KnowledgeGain
      ].includes(selectLessonId as CreationPageKey)
    ) {
      return INFORMATION_KEY;
    }

    return CONTENT_KEY;
  }, [selectLessonId]);

  const buttonDisable = useMemo(() => {
    return {
      back: selectLessonId === lessonIdKeys[0],
      next: selectLessonId === lessonIdKeys[lessonIdKeys.length - 1]
    };
  }, [selectLessonId]);

  const hanldeBack = () => {
    if (buttonDisable.back) return;
    const index = lessonIdKeys.findIndex((v) => v === selectLessonId);
    let lessonPage = '';
    if (selectLessonId === CreationPageKey.ChooseLesson || index < 0) {
      lessonPage = `${MenuLink.UGC}/${courseId}/creation/${CreationPageKey.GetYourReady}`;
    } else {
      lessonPage = `${MenuLink.UGC}/${courseId}/creation/${lessonIdKeys[index - 1]}`;
    }
    redirectToUrl(lessonPage);
  };

  const handleNext = () => {
    if (buttonDisable.next) return;
    setHandle(CreationHandle.ON_NEXT);
  };

  return (
    <Sidebar
      title={'未命名课程'}
      items={items}
      className="h-full w-[296px] bg-neutral-white"
      defaultSelect={selectLessonId}
      defaultOpenKeys={[defaultOpenKeys]}
      selectStyle={{
        backgroundColor: 'var(--neutral-off-white)'
      }}
      handleButton={
        <div className="flex flex-shrink-0 flex-col items-center gap-[10px] p-[40px]">
          <Button
            ghost
            disabled={buttonDisable.back}
            onClick={hanldeBack}
            className={`button-text-m h-[48px] w-full border-neutral-black uppercase text-neutral-black ${true ? '' : 'cursor-not-allowed opacity-50'}`}
          >
            back
          </Button>
          <Button
            type="primary"
            disabled={buttonDisable.next}
            loading={loading}
            onClick={handleNext}
            className={`button-text-m h-[48px] w-full uppercase text-neutral-black ${true ? '' : 'cursor-not-allowed opacity-50'}`}
          >
            next
          </Button>
        </div>
      }
      onSelect={(key, item: any) => {
        console.log(key);
        if (selectLessonId !== key) {
          if (key !== CONTENT_KEY) {
            redirectToUrl(`${MenuLink.UGC}/${courseId}/creation/${key}`);
          } else {
          }
        }
      }}
    ></Sidebar>
  );
};

export default UgcSidebar;
