import { BaseQuery } from "../../../common/libs/base.query";
import { RespostaItem } from "../models";
import { RespostaItemService } from "../services";

export class RespostaItemQuery extends BaseQuery<RespostaItem> {
  constructor(){
    super(new RespostaItemService())
  }

}