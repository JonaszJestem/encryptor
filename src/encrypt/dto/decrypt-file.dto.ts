import { IsNotEmpty, IsString } from 'class-validator';

export class DecryptFileDto {
  @IsNotEmpty()
  @IsString()
  public privateKey!: string;
}
