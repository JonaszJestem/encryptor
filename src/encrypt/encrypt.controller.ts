import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { AuthGuard } from '@nestjs/passport';
import { KeyPairResponse } from './dto/key-pair.response';
import { User } from '../user/user.entity';
import { GetUser } from '../utils/decorators/get-user.decorator';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { EncryptedFileResponse } from './dto/encrypted-file.response';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../utils/docs/swagger.config';
import { FileValidator } from './validators/file.validator';
import { ApiFiles } from '../utils/docs/api-files.decorator';
import { DecryptedFileResponse } from './dto/decrypted-file.response';
import { DecryptFileDto } from './dto/decrypt-file.dto';

@Controller()
@UseGuards(AuthGuard())
@ApiTags(ApiTag.Encryption)
@ApiBearerAuth()
export class EncryptController {
  constructor(private readonly encryptService: EncryptService) {}

  @Post('generate-key-pair')
  @HttpCode(HttpStatus.OK)
  public async signIn(@GetUser() user: User): Promise<KeyPairResponse> {
    return this.encryptService.generateKeyPairForUser(user.email);
  }

  @Post('encrypt')
  @ApiConsumes('multipart/form-data')
  @ApiFiles('file')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  public async encryptFile(
    @GetUser() user: User,
    @UploadedFile(FileValidator) file: Express.Multer.File,
  ): Promise<EncryptedFileResponse> {
    return {
      encryptedFile: await this.encryptService.encryptUserFile(
        user.email,
        file.buffer,
      ),
    };
  }

  @Post('decrypt')
  @ApiConsumes('multipart/form-data')
  @ApiFiles('file')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  public async decryptFile(
    @Body() decryptDto: DecryptFileDto,
    @UploadedFile(FileValidator)
    file: Express.Multer.File,
  ): Promise<DecryptedFileResponse> {
    return {
      decryptedFile: await this.encryptService.decryptUserFile(
        decryptDto.privateKey,
        file.buffer,
      ),
    };
  }
}
