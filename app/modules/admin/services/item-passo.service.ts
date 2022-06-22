import { BaseService } from "../../../common/libs/base.service";
import { ItemPasso } from "../models";

export class ItemPassoService extends BaseService<ItemPasso> {
  
  constructor(){
    super("/v1/itens-passo")
  }

  sortFN(t1: ItemPasso, t2: ItemPasso): number {
    return t1.ordem - t2.ordem;
  }

}