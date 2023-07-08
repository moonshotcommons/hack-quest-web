import { ReactNode } from 'react';

export interface DropData<T> {
  key: string;
  title: string;
  disable?: boolean;
  render?: (item: T) => ReactNode;
  children?: DropData<T>[];
}
