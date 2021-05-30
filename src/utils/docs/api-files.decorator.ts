import { ApiBody } from '@nestjs/swagger';

export const ApiFiles =
  (...files: string[]): MethodDecorator =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const out = files.reduce(
      (properties, file) => ({
        ...properties,
        [file]: {
          type: 'string',
          format: 'binary',
        },
      }),
      {},
    );

    return ApiBody({
      schema: {
        type: 'object',
        properties: out,
      },
    })(target, propertyKey, descriptor);
  };
