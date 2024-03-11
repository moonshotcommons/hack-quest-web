import { ReactNode } from 'react';
import { LessonType } from '../components/UgcSidebar/constant';

export interface LessonTypeDataType {
  value: LessonType;
  label: string;
  icon: ReactNode;
  description: string;
}
export interface LessonMenuType {
  id: string;
  value: string;
  type: LessonType | null;
  icon: ReactNode;
  isInput: boolean;
  isDragging: boolean;
}
export interface UnitMenuType {
  id: string;
  value: string;
  isInput: boolean;
  isToggle: boolean;
  lessonInputValue: string;
  isDragging: boolean;
  lesson: LessonMenuType[];
}

export enum CreationHandleKey {
  ADD_LESSON = 'addLesson'
}
