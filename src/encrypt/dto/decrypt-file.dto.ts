import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptFileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public privateKey!: string;
}
