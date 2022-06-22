import { BaseQuery } from "../../../common/libs/base.query";
import { Processo } from "../models/processo.model";
import { ProcessoService } from "../services/processo.service";

export class ProcessoQuery extends BaseQuery<Processo> {

  constructor(){
    super(new ProcessoService());
  }

}
