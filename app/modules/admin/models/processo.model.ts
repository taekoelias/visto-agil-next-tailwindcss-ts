import { BaseModel } from "../../../common/models/base.model";
import { EtapaProcesso } from "./etapa-processo.model";

export interface Processo extends BaseModel {
  nome: string;
  etapas: EtapaProcesso[]
}