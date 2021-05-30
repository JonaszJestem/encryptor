import { Injectable, PipeTransform } from '@nestjs/common';
import { NoFileToEncryptException } from '../encrypt.errors';

@Injectable()
export class FileValidator implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (!value?.buffer) {
      throw new NoFileToEncryptException();
    }
    return value;
  }
}
