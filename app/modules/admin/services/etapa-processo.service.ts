import { BaseService } from "../../../common/libs/base.service";
import { EtapaProcesso } from "../models/etapa-processo.model";
import { PassoEtapa } from "../models/passo-etapa.model";

export class EtapaProcessoService extends BaseService<EtapaProcesso>{
  constructor(){
    super('/v1/etapas-processo');
  }
  
  sortFN(t1: EtapaProcesso, t2: EtapaProcesso): number {
    return t1.ordem - t2.ordem;
  }
}
