export enum FilterType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}
export interface FilterDataType {
  type: FilterType;
  title: string;
  filterList: ParamType[];
}
export interface ParamType {
  label: string;
  value: string;
  checked: boolean;
}

export type SearchParamType = Record<string, ParamType[]>;
