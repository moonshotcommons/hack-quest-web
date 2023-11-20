import { ReactNode } from 'react';
import { BoxType } from '../../type';

export enum IconValue {
  REFRESH = 'refresh',
  UN_LINK = 'unLink',
  EDIT = 'edit',
  SHOW = 'show',
  UN_SHOW = 'unShow'
}

export interface IconType {
  icon: ReactNode;
  value: IconValue;
  type: BoxType[];
}
