import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes( new ValidationPipe({ whitelist:true }));
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.use(cookieParser())
  const configService = app.get(ConfigService);
  console.log(configService.get('PORT'))
  await app.listen(configService.get('PORT'));
}
bootstrap();
