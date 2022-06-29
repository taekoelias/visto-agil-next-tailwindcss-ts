import { BaseModel } from "../../../common/models/base.model";
import { Passo } from "./passo.model";

export enum TipoItem { 
  INPUT="INPUT", 
  COMBO="COMBO", 
  CHECKLIST="CHECKLIST", 
  YES_NO="YES/NO",
  TEXT="TEXT", 
  IMAGE="IMAGE", 
  VIDEO="VIDEO", 
  LINK="LINK"
}

export interface ItemPasso extends BaseModel {
  label: string;
  tipo: TipoItem;
  conteudo: string;
  ordem: number;
  passo: Passo;
}