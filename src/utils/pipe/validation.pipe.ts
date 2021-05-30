import { ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  // forbidUnknownValues: true,
  // whitelist: true,
  // forbidNonWhitelisted: true,
  transform: true,
});
