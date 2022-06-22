import { BaseService } from "../../../common/libs/base.service";
import { Processo } from "../models/processo.model";

export class ProcessoService extends BaseService<Processo> {
  
  constructor(){
    super('/v1/processos');
  }

  sortFN(t1: Processo, t2: Processo): number {
    return t1.nome > t2.nome ? 1 : -1;
  }

}