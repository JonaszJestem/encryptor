import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { apiRoutes, authUtils, createTestApp } from '../test.utils';
import { userFactory } from '../../seeds/factories/user.factory';
import { generateKeyPair, privateDecrypt } from 'crypto';
import { promisify } from 'util';

const generateKeyPairAsync = promisify(generateKeyPair);

describe('EncryptController /generate-key-pair (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  const encrypt = (token?: string) =>
    request(app.getHttpServer())
      .post(apiRoutes.encrypt.encrypt)
      .set({ Authorization: `Bearer ${token}` });

  it('returns unauthorized when user is not logged in', () => {
    return encrypt().expect(401);
  });

  it('returns encrypted file for logged in user', async () => {
    const password = 'password';
    const { privateKey, publicKey } = await generateKeyPairAsync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });
    const file = Buffer.from('some data');
    const user = await userFactory({ password, publicKey });
    const token = await authUtils(app).signIn(user.email, password);

    return encrypt(token)
      .attach('file', file, 'filename.txt')
      .expect(200)
      .expect(({ body }) => {
        const { encryptedFile } = body;
        try {
          const decryptedFile = privateDecrypt(
            privateKey,
            Buffer.from(encryptedFile, 'base64'),
          );
          expect(decryptedFile).toEqual(file);
        } catch (e) {
          fail('Cannot decrypt received file');
        }
      });
  });
});
