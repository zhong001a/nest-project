import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule)
  app.enableCors();
  const configService = app.get(ConfigService);
  console.log(configService.get('PORT'))
  app.connectMicroservice({
    transport: Transport.TCP,
    options:{
      host:'0.0.0.0',
      port: configService.get('PORT'),
    },
  })
  app.useLogger(app.get(Logger))
  await app.startAllMicroservices()
}
bootstrap();
