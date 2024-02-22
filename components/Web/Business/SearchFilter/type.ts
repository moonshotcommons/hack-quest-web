export const ALL = 'ALL';

export enum FilterType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}
export interface FilterDataType {
  type: FilterType;
  title: string;
  value: string;
  filterList: ParamType[];
}
export interface ParamType {
  label: string;
  value: string;
  checked: boolean;
}
