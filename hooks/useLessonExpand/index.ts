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
    if (!lesson?.length) return [];
    const lessonExpand: any[] = [];
    // console.info(lesson, 'lessonlessonlesson');
    lesson.map((v: any, i) => {
      const childExpand: Record<string, any> = [];
      let expandIndex = 0;
      v?.children?.map((c: any, j: number) => {
        childExpand[j] = {};
        if (~[NotionType.H1, NotionType.H2, NotionType.H3].indexOf(c.type)) {
          expandIndex = j;
        }
        if (NotionType.TOGGLE === c.type && j > expandIndex) {
          childExpand[expandIndex] = {
            isExpandAll: true,
            id: v.children[expandIndex].id,
            index: i
          };
          childExpand[j] = {
            expandNum: 0,
            id: c.id,
            index: i
          };
        }
      });
      const newChildExpand = childExpand.filter(
        (item: ExpandDataType) => item.id
      );
      // console.info(newChildExpand, 'newChildExpandnewChildExpand');
      lessonExpand.push(newChildExpand);
    });
    return lessonExpand;
  };

  return {
    getLessonExpand
  };
};

export default useLessonExpand;
