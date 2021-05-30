import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetUser = createParamDecorator((data, req: ExecutionContextHost): {
  email: string;
} => {
  const [incomingMessage] = req.getArgs();

  return incomingMessage.user;
});
