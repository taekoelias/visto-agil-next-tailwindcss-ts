import { BaseModel } from "../../../common/models/base.model";
import { Etapa } from "./etapa.model";
import { Passo } from "./passo.model";

export interface PassoEtapa extends BaseModel {
  passo: Passo;
  etapa: Etapa;
  ordem: number;
  passoId: number;
}