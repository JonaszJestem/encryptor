import { Module } from '@nestjs/common';
import { EncryptModule } from './encrypt/encrypt.module';
import { AuthModule } from './user/auth/auth.module';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EncryptModule, AuthModule, ConfigurationModule, DatabaseModule],
})
export class AppModule {}
