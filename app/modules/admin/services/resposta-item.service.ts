import { BaseService } from "../../../common/libs/base.service";
import { RespostaItem } from "../models/resposta-item.model";

export class RespostaItemService extends BaseService<RespostaItem>{
  
  constructor(){
    super('/v1/respostas-item');
  }
  
  sortFN(t1: RespostaItem, t2: RespostaItem): number {
    return 0;
  }
  
}