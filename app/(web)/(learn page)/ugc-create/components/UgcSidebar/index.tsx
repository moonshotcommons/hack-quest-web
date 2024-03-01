'use client';
import { FC } from 'react';

interface UgcSidebarProps {}

const UgcSidebar: FC<UgcSidebarProps> = () => {
  // const [course, setCourse] = useState<UGCCourseType>();
  // const setLearnPageTitle = useCourseStore((state) => state.setLearnPageTitle);
  // const { getLink } = useGetLessonLink();
  // const { redirectToUrl } = useRedirect();

  // const { items, defaultOpenKeys } = useMemo(() => {
  //   let defaultOpenKeys: string[] = [];
  //   let items: SidebarItemType[] = [];
  //   if (!course || !lesson)
  //     return {
  //       defaultOpenKeys,
  //       items
  //     };
  //   items = course.units!.map((unit) => {
  //     let prevLessonState = CompleteStateType.COMPLETED;
  //     return {
  //       key: unit.id,
  //       label: unit.title,
  //       data: unit,
  //       type: 'group',
  //       children: unit.pages!.map((page, i) => {
  //         if (page.id === lesson.id) defaultOpenKeys.push(unit.id);
  //         const disable =
  //           page.state === CompleteStateType.NOT_STARTED &&
  //           prevLessonState !== CompleteStateType.COMPLETED;
  //         const newPage = {
  //           key: page.id,
  //           disable,
  //           label: (
  //             <div
  //               className={`flex w-full items-center justify-between ${
  //                 disable ? 'cursor-not-allowed' : ''
  //               }`}
  //             >
  //               <div className="flex flex-1 shrink-0 flex-col overflow-hidden pr-5">
  //                 <span className="body-m line-clamp-2 w-full break-words text-neutral-black">
  //                   {page.title}
  //                 </span>
  //                 <span className="caption-12pt text-neutral-black">
  //                   {lessonTypeData[page.type].label}
  //                 </span>
  //               </div>
  //               {page.state !== CompleteStateType.COMPLETED && (
  //                 <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-rich-gray">
  //                   {lessonTypeData[page.type].icon}
  //                 </div>
  //               )}
  //               {page.state === CompleteStateType.COMPLETED && (
  //                 <svg
  //                   width="24"
  //                   height="25"
  //                   viewBox="0 0 24 25"
  //                   fill="none"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <circle cx="12" cy="12.5" r="12" fill="#00C365" />
  //                   <path
  //                     d="M6 12.4999L10.8 17.2999L19.2 8.8999"
  //                     stroke="white"
  //                     strokeLinecap="round"
  //                   />
  //                 </svg>
  //               )}
  //             </div>
  //           ),
  //           type: 'item',
  //           data: page
  //         };
  //         prevLessonState = page.state;
  //         return newPage as any;
  //       })
  //     };
  //   });

  //   return {
  //     defaultOpenKeys,
  //     items: items
  //   };
  // }, [lesson, course]);

  // const { run } = useRequest(
  //   () => {
  //     return webApi.courseApi.getCourseDetail(lesson?.courseId, true, true);
  //   },
  //   {
  //     manual: true,
  //     onSuccess(res: unknown) {
  //       setCourse(res as UGCCourseType);
  //     },
  //     cacheKey: lesson?.courseId
  //   }
  // );
  // if (!lesson || !course) return null;

  return (
    <div className="flex h-full w-[296px] flex-col pb-[20px] shadow-[2px_0px_4px_0px_rgba(0,0,0,0.12)]">
      <div className="w-full flex-1">
        {/* <Sidebar
          title={course.title}
          items={items}
          className="h-full w-[296px] "
          defaultSelect={lesson.id}
          defaultOpenKeys={defaultOpenKeys}
          handleButton={
            <div className="flex flex-shrink-0 flex-col items-center gap-[10px] p-[40px]">
              <Button
                ghost
                className={`button-text-m h-[48px] w-full border-neutral-black uppercase text-neutral-black ${true ? '' : 'cursor-not-allowed opacity-50'}`}
              >
                back
              </Button>
              <Button
                type="primary"
                className={`button-text-m h-[48px] w-full uppercase text-neutral-black ${true ? '' : 'cursor-not-allowed opacity-50'}`}
              >
                next
              </Button>
            </div>
          }
          onSelect={(key, item: any) => {
            if (item.id === lesson.id) return;
            const link = getLink(course.type, key, course.name);
            redirectToUrl(link);
          }}
        ></Sidebar> */}
      </div>
    </div>
  );
};

export default UgcSidebar;
