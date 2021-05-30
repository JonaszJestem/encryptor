import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthTransformer } from './auth.transformer';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { Config } from '../../config/configuration';
import { AUTH_DEFAULT_STRATEGY, JWT_EXPIRATION_TIME } from './auth.constants';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: AUTH_DEFAULT_STRATEGY,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        secret: configService.get('jwtSecret'),
        signOptions: {
          expiresIn: JWT_EXPIRATION_TIME,
        },
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  exports: [JwtStrategy, AuthService, PassportModule, JwtModule],
  providers: [AuthService, AuthTransformer, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
