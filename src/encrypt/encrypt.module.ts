import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { EncryptController } from './encrypt.controller';
import { AuthModule } from '../user/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [EncryptService],
  controllers: [EncryptController],
})
export class EncryptModule {}
