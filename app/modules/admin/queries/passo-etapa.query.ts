import { BaseQuery } from "../../../common/libs/base.query";
import { PassoEtapa } from "../models/passo-etapa.model";
import { PassoEtapaService } from "../services/passo-etapa.service";

export class PassoEtapaQuery extends BaseQuery<PassoEtapa> {
  constructor(){
    super(new PassoEtapaService())
  }
}