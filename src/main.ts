import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './utils/pipe/validation.pipe';
import { setupSwagger } from './utils/docs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(validationPipe);
  setupSwagger(app);

  await app.listen(3000);
}
void bootstrap();
