export interface BaseModel<T> {
  success: boolean;
  errorMessage?: boolean;
  content: T;
}
