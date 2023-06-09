import { IsString, IsNumber } from "class-validator";
export class ItemDto {
    
    @IsString()
    productId:string

    @IsNumber()
    quantity: number


}