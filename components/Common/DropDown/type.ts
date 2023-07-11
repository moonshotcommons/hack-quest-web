import { ReactNode } from 'react';

export interface DropData<P, T> {
  key: string;
  title: string;
  disable?: boolean;
  type: string;
  data: P;
  render?: (item: DropDataChildrenType<P>) => ReactNode;
  children?: DropDataChildrenType<T>[];
}

export interface DropDataChildrenType<T> {
  key: string;
  title: string;
  disable?: boolean;
  type: string;
  data: T;
  render?: (item: DropDataChildrenType<T>) => ReactNode;
}
