import { Body, Controller, Post, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './Models/user.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    async createUser( @Body() CreateUserDto: CreateUserDto ){
        return this.userService.create(CreateUserDto)
    }

    @Get('getall')
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user:UserDocument){
        return user
    }

    @Get('allusers')
    @UseGuards(JwtAuthGuard)
    async allUser(){
        return this.userService.find()
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.userService.delete(id)
    }
    

}
