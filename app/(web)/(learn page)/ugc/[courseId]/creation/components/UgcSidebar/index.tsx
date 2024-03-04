'use client';
import Sidebar, { SidebarItemType } from '@/components/Web/Business/Sidebar';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useRedirect } from '@/hooks/useRedirect';
import {
  InformationKey,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import { FC, useContext, useMemo } from 'react';
import { UgcCreateContext } from '../UgcCreateProvider';

interface UgcSidebarProps {}

const INFORMATION_KEY = 'courseInformation';
const CONTENT_KEY = 'content';
const PUBLISH_KEY = 'publish';

const UgcSidebar: FC<UgcSidebarProps> = () => {
  const courseInformation = useUgcCreationStore(
    (state) => state.courseInformation
  );

  const { courseId } = useContext(UgcCreateContext);

  const { redirectToUrl } = useRedirect();

  const units = useUgcCreationStore((state) => state.units);
  const selectLessonId = useUgcCreationStore((state) => state.selectLessonId);

  const items: SidebarItemType[] = useMemo(() => {
    const informationChildren: SidebarItemType[] = Object.keys(
      courseInformation
    ).map((key) => {
      return {
        key: key,
        label: (
          <div className="flex justify-between">
            <div className="flex flex-1 shrink-0 flex-col overflow-hidden pr-5">
              {key}
            </div>
            <div></div>
          </div>
        ),
        data: courseInformation[key as keyof typeof courseInformation],
        type: 'item'
      };
    });

    let unitsChildren: SidebarItemType[] = units.map((unit) => {
      return {
        key: unit.title,
        label: <div>{unit.title}</div>,
        data: unit,
        type: 'item'
      };
    });

    // 在结尾插入一个添加按钮
    unitsChildren = unitsChildren.concat({
      key: 'insert',
      label: <div>insert</div>,
      data: null,
      type: 'item',
      children: []
    });

    return [
      {
        key: INFORMATION_KEY,
        label: <h4 className="text-h4">Course Information</h4>,
        type: 'group',
        data: courseInformation,
        children: informationChildren
      }
      // {
      //   key: CONTENT_KEY,
      //   label: 'content',
      //   type: 'group',
      //   data: units,
      //   children: unitsChildren
      // }
    ];
  }, [units, courseInformation]);

  const defaultOpenKeys = useMemo(() => {
    if (
      [
        InformationKey.Introduction,
        InformationKey.IntendedLearners,
        InformationKey.KnowledgeGain
      ].includes(selectLessonId as InformationKey)
    ) {
      return INFORMATION_KEY;
    }

    return CONTENT_KEY;
  }, [selectLessonId]);

  return (
    <Sidebar
      title={'未命名课程'}
      items={items}
      className="h-full w-[296px] "
      defaultSelect={selectLessonId}
      defaultOpenKeys={[defaultOpenKeys]}
      // handleButton={
      //   <div className="flex flex-shrink-0 flex-col items-center gap-[10px] p-[40px]">
      //     <Button
      //       ghost
      //       className={`button-text-m h-[48px] w-full border-neutral-black uppercase text-neutral-black ${true ? '' : 'cursor-not-allowed opacity-50'}`}
      //     >
      //       back
      //     </Button>
      //     <Button
      //       type="primary"
      //       className={`button-text-m h-[48px] w-full uppercase text-neutral-black ${true ? '' : 'cursor-not-allowed opacity-50'}`}
      //     >
      //       next
      //     </Button>
      //   </div>
      // }
      onSelect={(key, item: any) => {
        redirectToUrl(`${MenuLink.UGC}/${courseId}/creation/${key}`);
      }}
    ></Sidebar>
  );
};

export default UgcSidebar;
