import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import * as Joi from 'joi'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemDocument, ItemSchema } from './models/item.schema';
import { LoggerModule, AUTH_SERVICE, DatabaseModule  } from '@app/common';
import { ItemRepository } from './items.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ 
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ItemDocument.name, schema: ItemSchema}
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),

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
    ])
  
  ],
  controllers: [ItemsController],
  providers: [ItemsService,ItemRepository],
})
export class ItemsModule {}
