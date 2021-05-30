import { BadRequestException } from '@nestjs/common';
import { Errors } from './encrypt.constants';

export class KeyPairNotGeneratedException extends BadRequestException {
  constructor() {
    super(Errors.KeyPairNotGenerated);
  }
}

export class NoFileToEncryptException extends BadRequestException {
  constructor() {
    super(Errors.NoFileToEncrypt);
  }
}
