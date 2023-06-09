import { Type } from "class-transformer";
import { IsDefined } from "class-validator";

import { ItemDto } from "./item.dto";
export class UpdateOrderDto {
   
    @IsDefined()
    @Type(() => ItemDto)
    products: [
      {
        product:ItemDto 
      }
    ]


}