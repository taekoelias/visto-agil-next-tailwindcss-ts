import { BaseService } from "../../../common/libs/base.service";
import { Etapa } from "../models/etapa.model";

export class EtapaService extends BaseService<Etapa> {
  
  constructor(){
    super('/v1/etapas');
  }

  sortFN(t1: Etapa, t2: Etapa): number {
    return t1.nome > t2.nome ? 1 : -1;
  }

}