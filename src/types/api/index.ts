export interface FetchResult<T> {
  data: T[] | null;
  success: boolean;
}
