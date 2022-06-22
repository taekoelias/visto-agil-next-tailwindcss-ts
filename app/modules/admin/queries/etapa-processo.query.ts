import { BaseQuery } from "../../../common/libs/base.query";
import { EtapaProcesso } from "../models/etapa-processo.model";
import { EtapaProcessoService } from "../services/etapa-processo.service";

export class EtapaProcessoQuery extends BaseQuery<EtapaProcesso> {
  constructor(){
    super(new EtapaProcessoService())
  }
}