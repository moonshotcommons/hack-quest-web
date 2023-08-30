export enum TabValueType {
  UN_LEARNING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2
}
export interface CourseTabType {
  label: string;
  value: TabValueType;
}
export const courseTab = [
  {
    label: 'In Process',
    value: 1
  },
  {
    label: 'Completed',
    value: 2
  }
];
