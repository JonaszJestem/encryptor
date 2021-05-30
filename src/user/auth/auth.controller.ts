import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from '../dto/sign-in-user.dto';
import { SignInResponse } from '../dto/sign-in-response.dto';
import { AuthTransformer } from './auth.transformer';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../../utils/docs/swagger.config';

@Controller()
@ApiTags(ApiTag.Auth)
export class AuthController {
  constructor(
    private readonly userAuthService: AuthService,
    private readonly authTransformer: AuthTransformer,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() signInDto: SignInUserDto,
  ): Promise<SignInResponse> {
    const signInToken = await this.userAuthService.signIn(signInDto);

    return this.authTransformer.transformSignIn(signInToken);
  }
}
