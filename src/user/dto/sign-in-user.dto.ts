import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @IsNotEmpty()
  @ApiProperty()
  public email!: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
