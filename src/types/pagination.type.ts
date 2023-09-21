export interface IPagination<T> {
  page: number;
  prePage: number;
  itemCount: number;
  itemFound: number;
  entities: T[];
}
