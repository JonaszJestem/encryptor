import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { apiRoutes, authUtils, createTestApp } from '../test.utils';
import { userFactory } from '../../seeds/factories/user.factory';

describe('EncryptController /generate-key-pair (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  const generateKeyPair = (token?: string) =>
    request(app.getHttpServer())
      .post(apiRoutes.encrypt.generateKeyPair)
      .set({ Authorization: `Bearer ${token}` });

  it('returns unauthorized when user is not logged in', () => {
    return generateKeyPair().expect(401);
  });

  it('returns new key pair for logged in user', async () => {
    const password = 'password';
    const user = await userFactory({ password });
    const token = await authUtils(app).signIn(user.email, password);

    return generateKeyPair(token)
      .send()
      .expect(200)
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          privKey: expect.any(String),
          pubKey: expect.any(String),
        });
      });
  });
});
