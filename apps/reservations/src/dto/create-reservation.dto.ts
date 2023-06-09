import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmptyObject, ValidateNested, IsNumber } from "class-validator";

import { CreateChargeDto } from "@app/common";


export class CreateReservationDto {
 
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;


    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge: CreateChargeDto

    // @IsDefined()
    // @ValidateNested()
    // @IsNotEmptyObject()
    // card: CardDto

    // @IsNumber()
    // amount:number

}
