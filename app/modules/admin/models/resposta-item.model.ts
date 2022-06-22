import { BaseModel } from "../../../common/models/base.model";
import { Etapa } from "./etapa.model";
import { ItemPasso } from "./item-passo.model";
import { Passo } from "./passo.model";
import { Processo } from "./processo.model";

export interface RespostaItem extends BaseModel {
  processo: Processo;
  etapa: Etapa;
  passo: Passo;
  item: ItemPasso
  valor: string;
}