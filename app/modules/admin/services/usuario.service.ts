import { BaseService } from "../../../common/libs/base.service";
import { Usuario } from "../models/usuario.model";

export class UsuarioService extends BaseService<Usuario> {
  
  constructor(){
    super('/v1/usuarios');
  }
  
  sortFN(t1: Usuario, t2: Usuario): number {
    return t1.nome > t2.nome ? 1 : -1 ;
  }
}