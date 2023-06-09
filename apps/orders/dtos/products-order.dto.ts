import { IsNumber, IsString } from "class-validator"

export class ProductOrderDto {

    @IsString()
    name:string
    
    @IsString()
    imageUrl: string
    
    @IsNumber()
    price: number
    
    @IsString()
    color: string
    
    @IsString()
    description: string

    @IsNumber()
    quantity: number
}
