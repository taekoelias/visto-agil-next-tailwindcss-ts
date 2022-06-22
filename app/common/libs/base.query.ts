import { useQuery, useMutation } from "react-query";
import { BaseModel } from "../models/base.model";
import { Page } from "../models/page.model";
import { BaseService } from "./base.service";

export interface QueryOptions {
  page?: Page;
  query?: string;
}

export abstract class BaseQuery<T extends BaseModel> {

  constructor(private service: BaseService<T>){

  }
  
  useQueryAll = (options?: {page?: Page, query?: string}) => {
    return useQuery<T[],Error>(this.service.resourceUrl,() => this.service.getAll(options));
  };
  
  useQueryOne = (id: number) => {
    return useQuery<T,Error>([this.service.resourceUrl,id],() => this.service.getOne(id));
  };

  createOrUpdate = () => {
    return useMutation<T,Error,T>(
      (newItem) => {
        return newItem.id === 0 ? this.service.create(newItem) : this.service.update(newItem)
      })
  }
  
  remove = () => {
    return useMutation<void,Error,number>((id) => this.service.remove(id))
  }
}
