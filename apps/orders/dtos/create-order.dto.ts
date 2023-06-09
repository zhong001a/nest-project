import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator";
import { CreateChargeDto } from "@app/common";
import { ItemDto } from "./item.dto";
export class CreateOrderDto {
   
    @IsDefined()
    @Type(() => ItemDto)
    products: [
      {
        product:ItemDto 
      }
    ]


}