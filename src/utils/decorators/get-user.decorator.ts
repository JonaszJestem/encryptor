import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from '../../user/user.entity';

export const GetUser = createParamDecorator((data, req: ExecutionContextHost): {
  email: string;
} => {
  const [incomingMessage] = req.getArgs();

  return (incomingMessage as { user: User }).user;
});
