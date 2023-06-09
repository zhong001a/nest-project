import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import { LoggerModule } from '@app/common';
import { LocalStrategy } from './strategies/local.stratigies';
import { JwtStragy } from './strategies/jwt.strategy';


@Module({
  imports: [
    UsersModule,
    
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),

      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService)=>({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:`${configService.get('JWT_EXPIRATION')}s`,
        }
      }),
      inject:[ConfigService]

    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStragy],
  
})
export class AuthModule {}