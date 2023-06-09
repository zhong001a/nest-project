import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repository';
import { OrderDocument, OrderSchema } from '../models/order.schema';
import * as Joi from 'joi'
import { DatabaseModule, LoggerModule, AUTH_SERVICE, PAYMENTS_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [ 
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: OrderDocument.name, schema: OrderSchema}
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        PAYMENT_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        PAYMENT_PORT: Joi.number().required()

      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) =>({
          transport: Transport.TCP,
          options: {
            host:configService.get('AUTH_HOST'),
            port:configService.get('AUTH_PORT')
          }

        }),
        inject:[ConfigService]
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) =>({
          transport: Transport.TCP,
          options: {
            host:configService.get('PAYMENT_HOST'),
            port:configService.get('PAYMENT_PORT')
          }

        }),
        inject:[ConfigService]
      },
    ])
  
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
