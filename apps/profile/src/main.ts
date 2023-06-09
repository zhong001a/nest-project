import { NestFactory } from '@nestjs/core';
import { ProfileModule } from './profile.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ProfileModule);
  app.useGlobalPipes( new ValidationPipe({ whitelist:true }));
  app.enableCors();
  app.use(cookieParser())
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService);
  console.log(configService.get('PORT'))
  await app.listen(configService.get('PORT'));

}
bootstrap();
