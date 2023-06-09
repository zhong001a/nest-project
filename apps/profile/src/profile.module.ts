import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { ProfileRepository } from './profile.repository';
import { ProfileDocument, ProfileSchema } from './models/profile.schema';
import { DatabaseModule, LoggerModule, AUTH_SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [    
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ProfileDocument.name, schema: ProfileSchema}
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
  controllers: [ProfileController],
  providers: [ ProfileService, ProfileRepository ],
})
export class ProfileModule {}
