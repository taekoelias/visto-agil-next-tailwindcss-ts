import { BaseModel } from "../models/base.model";
import { Page } from "../models/page.model";
import { Pagination } from "../models/pagination.model";
import { api, apiList } from "./axios";

export abstract class BaseService<T extends BaseModel> {
    
  resourceUrl : string;
  
  constructor(resourceUrl: string){
      this.resourceUrl = resourceUrl;
  }
  
  abstract sortFN(t1 :T, t2: T) : number

  getAll = async (options?: {page?: Page, query?: string}): Promise<T[]> => {
    const response = await apiList.get<T[]>(
        this.resourceUrl, 
        {
          params: options ? {...options?.page,query: options?.query} : {}
        })
    if (response?.data && this.sortFN)
        return response.data.sort(this.sortFN)
    
    return response.data
  }

  getAllPage = async (options?: {page?: Page, query?: string}): Promise<Pagination<T>> => {
    const response = await apiList.get<Pagination<T>>(
        this.resourceUrl, 
        {
            params: options ? {...options?.page,query: options?.query} : {}
        })
    return response.data
  }
  
  getOne = async (id: number): Promise<T> => {
      const response = await apiList.get<T[]>(this.resourceUrl, {
          params: {
              query: `id:${id}`
          }})
      return response.data[0]
  }
  
  create = async (newitem: T): Promise<T> => {
      const response = await api.post(this.resourceUrl, newitem)
      return response.data
  }
  
  update = async (newitem: T): Promise<T> => {
      const response = await api.put(this.resourceUrl, newitem)
      return response.data
  }
  
  remove = async (id: number): Promise<void> => {
      const response = await api.delete(this.resourceUrl,{params: {id: id}})
      return response.data
  }
  
}