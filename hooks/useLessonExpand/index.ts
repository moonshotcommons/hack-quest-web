import {
  CustomComponent,
  NotionComponent,
  NotionType
} from '@/components/v2/LessonPage/type';

export interface ExpandDataType {
  isExpandAll?: boolean;
  expandNum?: number;
  id: string;
  index: number;
}
export const useLessonExpand = (
  lesson: (CustomComponent | NotionComponent)[]
) => {
  const getLessonExpand = () => {
    const lessonExpand: any[] = [];
    lesson.map((v: any, i: number) => {
      const childExpand: any[] = [];
      let expandIndex = 0;
      getExpand(lessonExpand, childExpand, v, i, expandIndex, true);
    });

    return lessonExpand;
  };

  const getExpand = (
    lessonExpand: any,
    childExpand: any,
    v: any,
    i: number,
    expandIndex: number,
    main?: boolean | undefined
  ) => {
    if (!v?.children?.length) return [];
    v.children.map((c: any, j: number) => {
      childExpand[j] = {};
      if (NotionType.TOGGLE === c.type) {
        childExpand[expandIndex] = {
          isExpandAll: true,
          id: v.children[expandIndex]?.id,
          index: i
        };
        childExpand[j] = {
          expandNum: 0,
          id: c.id,
          index: i
        };
      } else if (
        ~[
          NotionType.H1,
          NotionType.H2,
          NotionType.H3,
          NotionType.NUMBERED_LIST_ITEM
        ].indexOf(c.type)
      ) {
        expandIndex = j;
        if (c.children?.length) {
          getExpand(lessonExpand, [], c, i, expandIndex);
        }
      }
    });
    const newChildExpand = [
      ...new Set(childExpand.map((v: any) => JSON.stringify(v)))
    ]
      .map((v: any) => {
        if (v) {
          return JSON.parse(v);
        }
        return {};
      })
      .filter((item: any) => item.id);
    if (newChildExpand.length) {
      lessonExpand.push(newChildExpand);
    } else if (main) {
      lessonExpand.push([]);
    }
  };
  return {
    getLessonExpand
  };
};

export default useLessonExpand;
