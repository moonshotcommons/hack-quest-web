/** 标准分页结果数据 */
export interface PageResult<T> {
  total: number;
  data: T[];
}
