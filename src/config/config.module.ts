import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration, { DEFAULT_DATABASE } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        DATABASE: Joi.string().default(DEFAULT_DATABASE),
      }),
    }),
  ],
})
export class ConfigurationModule {}
