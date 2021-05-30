import { AppModule } from '../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { validationPipe } from '../src/utils/pipe/validation.pipe';
import request from 'supertest';

export const createTestApp = async (): Promise<INestApplication> => {
  const module = Test.createTestingModule({
    imports: [AppModule],
  });

  const moduleFixture: TestingModule = await module.compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(validationPipe);
  app.setGlobalPrefix(API_PREFIX);
  await app.init();

  return app;
};

export const API_PREFIX = '/api';

export const apiRoutes = {
  auth: {
    signIn: `${API_PREFIX}/sign-in`,
  },
  encrypt: {
    generateKeyPair: `${API_PREFIX}/generate-key-pair`,
    encrypt: `${API_PREFIX}/encrypt`,
  },
};

export const authUtils = (app: INestApplication) => ({
  signIn: async (email: string, password: string) => {
    const { body } = await request(app.getHttpServer())
      .post(apiRoutes.auth.signIn)
      .send({ email, password })
      .expect(200);
    return body.authToken;
  },
});
