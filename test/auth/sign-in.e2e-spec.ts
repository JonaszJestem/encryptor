import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { apiRoutes, createTestApp } from '../test.utils';
import { userFactory } from '../../seeds/factories/user.factory';

describe('AuthController /sign-in (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  const signIn = () => request(app.getHttpServer()).post(apiRoutes.auth.signIn);

  it('returns bad request when no email is passed', () => {
    return signIn().send({ password: 'password' }).expect(400);
  });

  it('returns bad request when no password is passed', () => {
    return signIn().send({ email: 'john@example.com' }).expect(400);
  });

  it('returns not found when user does not exist', () => {
    return signIn()
      .send({ email: 'john@example.com', password: 'password' })
      .expect(404);
  });

  it('returns not found when password is wrong', async () => {
    const email = 'john@example.com';
    const password = 'password';
    await userFactory({ email, password });

    return signIn().send({ email, password: 'wrong password' }).expect(404);
  });

  it('return jwt token if user is found and password is correct', async () => {
    const email = 'john@example.com';
    const password = 'password';
    await userFactory({ email, password });

    return signIn()
      .send({ email, password })
      .expect(200)
      .expect(({ body }) => {
        expect(body.authToken).toEqual(expect.any(String));
      });
  });
});
