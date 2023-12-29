export interface FilterOptionType {
  name: string;
  value: string | number | boolean;
  isSelect: boolean;
}

export interface FilterItemType {
  filterName: string;
  filterField: string;
  options: FilterOptionType[];
}
