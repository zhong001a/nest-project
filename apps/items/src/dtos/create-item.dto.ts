import { IsString, IsNumber } from "class-validator";
export class CreateItemDto {

    @IsString()
    id: string

    @IsString()
    name: string

    @IsString()
    imageUrl: string

    @IsNumber()
    price: number

    @IsString()
    color:string

    @IsString()
    description:string
}