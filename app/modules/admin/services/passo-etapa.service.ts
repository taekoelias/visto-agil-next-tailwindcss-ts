import { BaseService } from "../../../common/libs/base.service";
import { PassoEtapa } from "../models/passo-etapa.model";

export class PassoEtapaService extends BaseService<PassoEtapa>{
  constructor(){
    super('/v1/passos-etapa');
  }
  
  sortFN(t1: PassoEtapa, t2: PassoEtapa): number {
    return t1.ordem - t2.ordem;
  }
}
