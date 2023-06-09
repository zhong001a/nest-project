import { IsDate, IsString } from "class-validator"
import { Type } from "class-transformer";
export class CreateProfileDto{
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsDate()
    @Type(() => Date)
    birthdate: Date

    @IsString()
    image: string

    @IsString()
    phone: string

    

}