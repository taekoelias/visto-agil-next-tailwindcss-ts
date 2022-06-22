import { BaseService } from "../../../common/libs/base.service";
import { Passo } from "../models/passo.model";

export class PassoService extends BaseService<Passo>{
  
  constructor(){
    super('/v1/passos');
  }

  sortFN(t1: Passo, t2: Passo): number {
    return t1.nome > t2.nome ? 1 : -1;
  }

}