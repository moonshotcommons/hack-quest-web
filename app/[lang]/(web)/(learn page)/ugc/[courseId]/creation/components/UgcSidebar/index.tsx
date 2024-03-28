'use client';
import Sidebar, { SidebarItemType } from '@/components/Web/Business/Sidebar';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import { FC, useContext, useMemo } from 'react';
import Button from '@/components/Common/Button';
import { CourseContentType, CreationPageKey, UgcCreateContext } from '../../constant/type';
import { labelMaps } from './constant';
import useUgcCreationDataHandle from '@/hooks/courses/useUgcCreationDataHandle';
import { CreationHandle, useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
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
  const { courseId, courseInformation, selectLessonId } = useContext(UgcCreateContext);
  const { getUnitList, findLastLesson } = useUgcCreationDataHandle(courseId);
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
    const informationChildren: SidebarItemType[] = Object.keys(courseInformation).map((key) => {
      return {
        key: key,
        disable: disableAll(key),
        label: (
          <div className={`body-m flex w-full justify-between`}>
            <div className="flex flex-1 shrink-0 flex-col overflow-hidden pr-5">{labelMaps[key as keyof typeof courseInformation]}</div>
            <div>
              {!courseInformation[key as keyof typeof courseInformation].completed && (
                <div className="h-6 w-6 rounded-full border border-neutral-black"></div>
              )}
              {courseInformation[key as keyof typeof courseInformation].completed && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00C365" />
                  <path
                    d="M18.4881 7.78628L9.82143 17.1196C9.69578 17.2551 9.51954 17.3323 9.33476 17.3329C9.15756 17.334 8.98724 17.2644 8.86143 17.1396L5.52809 13.8063C5.26668 13.5449 5.26668 13.121 5.52809 12.8596C5.78951 12.5982 6.21334 12.5982 6.47476 12.8596L9.33476 15.7063L17.5148 6.87961C17.6717 6.68612 17.9233 6.59625 18.1673 6.64659C18.4113 6.69693 18.6068 6.87908 18.6743 7.11887C18.7418 7.35866 18.67 7.61607 18.4881 7.78628Z"
                    fill="white"
                  />
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
                <div className="flex flex-1 shrink-0 flex-col overflow-hidden pr-5">{labelMaps[key as keyof CourseContentType]}</div>
                <div>
                  {!content[key as keyof CourseContentType].completed && (
                    <div className="h-6 w-6 rounded-full border border-neutral-black"></div>
                  )}
                  {content[key as keyof CourseContentType].completed && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#00C365" />
                      <path
                        d="M18.4881 7.78628L9.82143 17.1196C9.69578 17.2551 9.51954 17.3323 9.33476 17.3329C9.15756 17.334 8.98724 17.2644 8.86143 17.1396L5.52809 13.8063C5.26668 13.5449 5.26668 13.121 5.52809 12.8596C5.78951 12.5982 6.21334 12.5982 6.47476 12.8596L9.33476 15.7063L17.5148 6.87961C17.6717 6.68612 17.9233 6.59625 18.1673 6.64659C18.4113 6.69693 18.6068 6.87908 18.6743 7.11887C18.7418 7.35866 18.67 7.61607 18.4881 7.78628Z"
                        fill="white"
                      />
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

  const { defaultOpenKeys, defaultSelect } = useMemo(() => {
    let defaultOpenKeys = INFORMATION_KEY;
    if (
      [CreationPageKey.Introduction, CreationPageKey.IntendedLearners, CreationPageKey.KnowledgeGain].includes(
        selectLessonId as CreationPageKey
      )
    ) {
      defaultOpenKeys = INFORMATION_KEY;
    }

    defaultOpenKeys = CONTENT_KEY;
    let defaultSelect = selectLessonId;

    if (selectLessonId !== CreationPageKey.GetYourReady) {
      defaultSelect = CreationPageKey.Curriculum;
    }

    return {
      defaultOpenKeys,
      defaultSelect
    };
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
      defaultSelect={defaultSelect}
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
        if (selectLessonId === key) return;
        if (key === CreationPageKey.Curriculum) {
          const lesson = findLastLesson();
          key = lesson?.id || CreationPageKey.ChooseLesson;
        }
        redirectToUrl(`${MenuLink.UGC}/${courseId}/creation/${key}`);
      }}
    ></Sidebar>
  );
};

export default UgcSidebar;
