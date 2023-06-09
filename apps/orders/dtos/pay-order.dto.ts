import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator";
import { CreateChargeDto } from "@app/common";
import { ItemDto } from "./item.dto";

export class PayOrderDto{
       
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge: CreateChargeDto

}