import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes( new ValidationPipe({ whitelist:true }));
  app.enableCors();
  app.useLogger(app.get(Logger))
  app.use(cookieParser())

  const configService = app.get(ConfigService);
  console.log(configService.get('PORT'))
  await app.listen(configService.get('PORT'));
}
bootstrap();
