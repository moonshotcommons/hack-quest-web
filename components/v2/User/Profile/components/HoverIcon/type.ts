import { ReactNode } from 'react';
export enum BoxType {
  GITHUB_ACTIVITY = 'GithubActivity',
  EXPERIENCE = 'Experience'
}

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
