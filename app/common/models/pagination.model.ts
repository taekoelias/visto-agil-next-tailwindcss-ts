import { BaseModel } from "./base.model";

export interface Pagination<T extends BaseModel> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}