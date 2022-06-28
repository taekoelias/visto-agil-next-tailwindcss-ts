import { BaseModel } from "../../../common/models/base.model";

export interface Usuario extends BaseModel {
  nome: string,
  email: string,
  perfil: 'admin'|'user'
}