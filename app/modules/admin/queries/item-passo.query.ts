import { BaseQuery } from "../../../common/libs/base.query";
import { ItemPasso } from "../models/item-passo.model";
import { ItemPassoService } from "../services/item-passo.service";

export class ItemPassoQuery extends BaseQuery<ItemPasso> {

 constructor(){
   super(new ItemPassoService())
 }

}