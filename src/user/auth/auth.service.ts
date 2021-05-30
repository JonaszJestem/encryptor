import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';
import { SignInUserDto } from '../dto/sign-in-user.dto';
import { UserRepository } from '../user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from '../user.errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(signInDto: SignInUserDto): Promise<string> {
    const user = await this.userRepository.getUserByEmail(signInDto.email);

    const isPasswordValid = await argon2.verify(
      user.password,
      signInDto.password,
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return this.jwtService.signAsync({ email: user.email });
  }
}
