import { CustomType, NotionComponentType } from '@/components/ComponentRenderer/type';

export const useLessonExpand = (lesson: any[]) => {
  const getLessonExpand = () => {
    const lessonExpand: any[] = [];
    lesson.map((v: any, i: number) => {
      const childExpand: any[] = [];
      let expandIndex = 0;
      getExpand(v.id, lessonExpand, childExpand, v, i, expandIndex, true);
    });
    return lessonExpand;
  };

  const getExpand = (
    cId: string,
    lessonExpand: any,
    childExpand: any,
    v: any,
    i: number,
    expandIndex: number,
    main?: boolean | undefined
  ) => {
    if (!v?.children?.length) return;
    v.children.map((c: any, j: number) => {
      childExpand[j] = {};
      if (NotionComponentType.TOGGLE === c.type) {
        childExpand[expandIndex] = {
          isExpandAll: true,
          id: v.children[expandIndex]?.id,
          index: i
        };
        childExpand[j] = {
          expandNum: 0,
          id: c.id,
          index: i,
          cId: cId
        };
      } else if (
        ~[
          NotionComponentType.H1,
          NotionComponentType.H2,
          NotionComponentType.H3,
          NotionComponentType.NUMBERED_LIST_ITEM,
          CustomType.QuizA,
          CustomType.QuizB,
          CustomType.QuizC
        ].indexOf(c.type)
      ) {
        expandIndex = j;
        if (c.children?.length) {
          getExpand(cId, lessonExpand, [], c, i, expandIndex);
          return;
        }
      }
    });

    const newChildExpand = Array.from(new Set(childExpand.map((v: any) => JSON.stringify(v))))
      .map((v: any) => {
        if (v) {
          return JSON.parse(v);
        }
        return {};
      })
      .filter((item: any) => item.id);

    if (newChildExpand.length) {
      lessonExpand.push(newChildExpand || []);
    }
  };

  return {
    getLessonExpand
  };
};

export default useLessonExpand;
