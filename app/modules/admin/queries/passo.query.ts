import { BaseQuery } from "../../../common/libs/base.query";
import { Passo } from "../models/passo.model";
import { PassoService } from "../services/passo.service";

export class PassoQuery extends BaseQuery<Passo> {
  constructor(){
    super(new PassoService());
  }
}