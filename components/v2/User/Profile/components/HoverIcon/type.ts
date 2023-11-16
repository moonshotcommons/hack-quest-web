import { ReactNode } from 'react';
import { BoxType } from '../../type';

export enum IconValue {
  REFRESH = 'refresh',
  LINK = 'link',
  EDIT = 'edit'
}

export interface IconType {
  icon: ReactNode;
  value: IconValue;
  type: BoxType[];
}
