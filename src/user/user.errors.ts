import { NotFoundException } from '@nestjs/common';
import { Errors } from './user.constants';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(Errors.UserNotFound);
  }
}
