import { BaseModel } from "../../../common/models/base.model";
import { Etapa } from "./etapa.model";
import { Processo } from "./processo.model";

export interface EtapaProcesso extends BaseModel {
  processo: Processo;
  etapa: Etapa;
  ordem: number;
  etapaId: number;
}