import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dtos/get-user.dto';

@Injectable()
export class UsersService {
    constructor( private readonly  userRepository: UsersRepository){}

    async create( createUserDto:CreateUserDto ){

        const ge = await this.validateCreateUserDto(createUserDto);
        console.log(ge)
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
          });
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
          await this.userRepository.findOne({ email: createUserDto.email });
        } catch (err) {
          return;
        }
        throw new BadRequestException('Email already exists.');
      }

    async verifyUser(email:string, password: string){

        let user;

        try{
            user = await this.userRepository.findOne({ email });
        }
        catch(err){
          throw new UnauthorizedException("Email Does not exit")
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);

        console.log(passwordIsValid)
        if (!passwordIsValid) {
          throw new UnauthorizedException('Invalid Password..');
        }

        return user;
    }
    
    find(){
        return this.userRepository.find({})
    }


    delete (_id: string){
        return this.userRepository.findOneAndDelete({_id})
    }

    async getUser( getUserDto: GetUserDto){
      return this.userRepository.findOne(getUserDto)
    }


}
