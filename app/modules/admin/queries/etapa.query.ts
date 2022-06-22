import { BaseQuery } from "../../../common/libs/base.query";
import { Etapa } from "../models/etapa.model";
import { EtapaService } from "../services/etapa.service";

export class EtapaQuery extends BaseQuery<Etapa> {

  constructor(){
    super(new EtapaService());
  }

}
