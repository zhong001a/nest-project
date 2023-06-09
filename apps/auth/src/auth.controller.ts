import { Controller, Get, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/common';
import { UserDocument } from './users/Models/user.schema';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data:any){
      return data.user;
  }

}
