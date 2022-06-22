import { BaseModel } from "../../../common/models/base.model";
import { Passo } from "./passo.model";

export enum TipoItem { 
  INPUT="INPUT",TEXT="TEXT", IMAGE="IMAGE", VIDEO="VIDEO", LINK="LINK"
}

export interface ItemPasso extends BaseModel {
  label: string;
  tipo: TipoItem;
  conteudo: string;
  ordem: number;
  passo: Passo;
}